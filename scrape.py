import requests
from bs4 import BeautifulSoup
import os
import sys
import json
import re
from urllib.parse import urljoin, urlparse
from datetime import datetime

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

VISITED = set()
RESULTS = {
    'metadata': {},
    'pages': [],
    'links': [],
    'forms': [],
    'images': [],
    'scripts': [],
    'styles': [],
    'meta_tags': [],
    'headings': [],
    'errors': []
}

def log(msg, level="INFO"):
    icons = {"INFO": "[*]", "OK": "[+]", "WARN": "[!]", "ERR": "[x]"}
    print(f"{icons.get(level, '[*]')} {msg}")

def is_same_domain(url1, url2):
    return urlparse(url1).netloc == urlparse(url2).netloc

def clean_url(url):
    return url.split('#')[0].rstrip('/')

def scrape_page(url, output_dir="hasil"):
    if url in VISITED:
        return None
    VISITED.add(url)
    
    log(f"Scraping: {url}")
    
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        log(f"Status: {res.status_code}", "OK" if res.status_code == 200 else "ERR")
        
        if res.status_code != 200:
            RESULTS['errors'].append({'url': url, 'status': res.status_code, 'time': datetime.now().isoformat()})
            return None
        
        soup = BeautifulSoup(res.text, 'html.parser')
        
        title = soup.title.string.strip() if soup.title and soup.title.string else 'N/A'
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        
        page_data = {
            'url': url,
            'title': title,
            'description': meta_desc.get('content', '') if meta_desc else '',
            'status': res.status_code,
            'scraped_at': datetime.now().isoformat()
        }
        RESULTS['pages'].append(page_data)
        
        for meta in soup.find_all('meta'):
            if meta.get('name') or meta.get('property'):
                RESULTS['meta_tags'].append({
                    'url': url,
                    'name': meta.get('name') or meta.get('property'),
                    'content': meta.get('content', '')
                })
        
        for tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            for heading in soup.find_all(tag):
                text = heading.get_text(strip=True)
                if text:
                    RESULTS['headings'].append({'url': url, 'level': tag, 'text': text})
        
        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urljoin(url, href)
            text = a.get_text(strip=True)
            RESULTS['links'].append({
                'source': url,
                'url': full_url,
                'text': text,
                'internal': is_same_domain(url, full_url)
            })
        
        for form in soup.find_all('form'):
            inputs = []
            for inp in form.find_all(['input', 'textarea', 'select']):
                inputs.append({
                    'type': inp.get('type', inp.name),
                    'name': inp.get('name', ''),
                    'placeholder': inp.get('placeholder', '')
                })
            RESULTS['forms'].append({
                'url': url,
                'action': form.get('action', ''),
                'method': form.get('method', 'GET'),
                'inputs': inputs
            })
        
        for img in soup.find_all('img', src=True):
            RESULTS['images'].append({
                'url': url,
                'src': urljoin(url, img.get('src')),
                'alt': img.get('alt', '')
            })
        
        for script in soup.find_all('script', src=True):
            RESULTS['scripts'].append({'url': url, 'src': urljoin(url, script.get('src'))})
        
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href')
            if href:
                RESULTS['styles'].append({'url': url, 'href': urljoin(url, href)})
        
        domain = urlparse(url).netloc.replace('.', '_')
        page_dir = os.path.join(output_dir, domain)
        os.makedirs(page_dir, exist_ok=True)
        
        filename = re.sub(r'[^a-zA-Z0-9]', '_', urlparse(url).path) or 'index'
        
        with open(os.path.join(page_dir, f"{filename}.html"), 'w', encoding='utf-8') as f:
            f.write(res.text)
        
        with open(os.path.join(page_dir, f"{filename}.txt"), 'w', encoding='utf-8') as f:
            f.write(soup.get_text(separator='\n', strip=True))
        
        log(f"Saved: {filename}.html", "OK")
        return soup
        
    except Exception as e:
        log(f"Error: {e}", "ERR")
        RESULTS['errors'].append({'url': url, 'error': str(e)})
        return None

def scrape_recursive(url, depth=2, output_dir="hasil"):
    if depth == 0:
        return
    soup = scrape_page(url, output_dir)
    if not soup:
        return
    internal_links = set()
    for a in soup.find_all('a', href=True):
        next_url = clean_url(urljoin(url, a['href']))
        if is_same_domain(url, next_url) and next_url not in VISITED:
            internal_links.add(next_url)
    log(f"Found {len(internal_links)} internal links")
    for next_url in list(internal_links)[:10]:
        scrape_recursive(next_url, depth - 1, output_dir)

def export_json(output_dir="hasil"):
    os.makedirs(output_dir, exist_ok=True)
    RESULTS['metadata'] = {
        'total_pages': len(RESULTS['pages']),
        'total_links': len(RESULTS['links']),
        'total_forms': len(RESULTS['forms']),
        'total_images': len(RESULTS['images']),
        'scraped_at': datetime.now().isoformat()
    }
    with open(os.path.join(output_dir, "hasil.json"), 'w', encoding='utf-8') as f:
        json.dump(RESULTS, f, indent=2, ensure_ascii=False)
    log(f"JSON saved: {output_dir}/hasil.json", "OK")
    print("\n" + "=" * 40)
    for k, v in RESULTS['metadata'].items():
        print(f"  {k}: {v}")
    print("=" * 40)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scrape.py <URL> [depth]")
        sys.exit(1)
    target_url = sys.argv[1]
    depth = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    scrape_recursive(target_url, depth)
    export_json()
