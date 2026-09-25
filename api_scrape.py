import requests
import json
import sys
import os
from datetime import datetime
from urllib.parse import urlparse

# ─── KONFIGURASI ───
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
}

# ─── FUNGSI SCRAPE API ───
def scrape_api(url, method='GET', params=None, data=None, output_dir='hasil'):
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"[*] Target: {url}")
    print(f"[*] Method: {method}")
    
    try:
        if method.upper() == 'GET':
            res = requests.get(url, headers=HEADERS, params=params, timeout=15)
        elif method.upper() == 'POST':
            res = requests.post(url, headers=HEADERS, json=data, timeout=15)
        else:
            print(f"[!] Method tidak didukung: {method}")
            return None
        
        print(f"[+] Status: {res.status_code}")
        print(f"[+] Content-Type: {res.headers.get('Content-Type', 'N/A')}")
        print(f"[+] Size: {len(res.content)} bytes")
        
        # Coba parse JSON
        try:
            json_data = res.json()
            print(f"[+] JSON valid")
            
            # Simpan JSON
            domain = urlparse(url).netloc.replace('.', '_')
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{domain}_{timestamp}.json"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
            
            print(f"[+] JSON saved: {filepath}")
            
            # Tampilkan preview
            print("\n" + "=" * 50)
            print("PREVIEW JSON:")
            print("=" * 50)
            preview = json.dumps(json_data, indent=2, ensure_ascii=False)
            print(preview[:1000])
            if len(preview) > 1000:
                print("\n... (truncated)")
            print("=" * 50)
            
            return json_data
            
        except json.JSONDecodeError:
            # Kalau bukan JSON, simpan sebagai text
            print(f"[!] Response bukan JSON, simpan sebagai text")
            
            domain = urlparse(url).netloc.replace('.', '_')
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{domain}_{timestamp}.txt"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(res.text)
            
            print(f"[+] Text saved: {filepath}")
            print("\n" + "=" * 50)
            print("PREVIEW TEXT:")
            print("=" * 50)
            print(res.text[:1000])
            print("=" * 50)
            
            return res.text
            
    except requests.exceptions.Timeout:
        print("[!] Timeout — server gak merespons")
        return None
    except requests.exceptions.ConnectionError:
        print("[!] Connection error — cek internet atau URL")
        return None
    except Exception as e:
        print(f"[!] Error: {e}")
        return None

# ─── FUNGSI BRUTEFORCE ENDPOINT ───
def bruteforce_endpoint(base_url, wordlist=None, output_dir='hasil'):
    if wordlist is None:
        wordlist = [
            'api', 'v1', 'v2', 'v3', 'api/v1', 'api/v2', 'api/v3',
            'users', 'user', 'login', 'register', 'auth', 'token',
            'admin', 'dashboard', 'config', 'settings', 'status',
            'health', 'ping', 'version', 'info', 'data', 'list',
            'search', 'query', 'products', 'items', 'posts', 'comments',
            'get', 'fetch', 'load', 'send', 'create', 'update', 'delete'
        ]
    
    os.makedirs(output_dir, exist_ok=True)
    results = []
    
    print(f"[*] Bruteforce: {base_url}")
    print(f"[*] Total endpoint: {len(wordlist)}")
    print()
    
    for i, endpoint in enumerate(wordlist, 1):
        url = f"{base_url.rstrip('/')}/{endpoint}"
        try:
            res = requests.get(url, headers=HEADERS, timeout=5)
            status = res.status_code
            
            if status == 200:
                icon = "[+]"
                results.append({
                    'url': url,
                    'status': status,
                    'size': len(res.content),
                    'content_type': res.headers.get('Content-Type', '')
                })
                print(f"{icon} {status} - {url}")
            elif status in [301, 302, 307, 308]:
                print(f"[~] {status} - {url} (redirect)")
            elif status == 403:
                print(f"[!] {status} - {url} (forbidden)")
            elif status == 401:
                print(f"[!] {status} - {url} (unauthorized)")
            elif status == 404:
                pass  # skip 404
            else:
                print(f"[?] {status} - {url}")
                
        except Exception:
            pass
    
    # Simpan hasil
    if results:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filepath = os.path.join(output_dir, f"endpoints_{timestamp}.json")
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print(f"\n[+] Found {len(results)} endpoint")
        print(f"[+] Saved: {filepath}")
    else:
        print("\n[!] Gak ada endpoint yang ditemukan")
    
    return results

# ─── FUNGSI SCAN HEADER ───
def scan_headers(url):
    print(f"[*] Scanning headers: {url}")
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        print(f"\n{'=' * 50}")
        print("RESPONSE HEADERS:")
        print(f"{'=' * 50}")
        for key, value in res.headers.items():
            print(f"  {key}: {value}")
        print(f"{'=' * 50}")
    except Exception as e:
        print(f"[!] Error: {e}")

# ─── MAIN ───
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python api_scrape.py <URL>                  # Scrape API")
        print("  python api_scrape.py <URL> POST '<json>'    # POST API")
        print("  python api_scrape.py --brute <URL>          # Bruteforce endpoint")
        print("  python api_scrape.py --headers <URL>        # Scan headers")
        print()
        print("Contoh:")
        print("  python api_scrape.py https://api.example.com/users")
        print("  python api_scrape.py --brute https://api.example.com")
        sys.exit(1)
    
    arg1 = sys.argv[1]
    
    if arg1 == '--brute':
        if len(sys.argv) < 3:
            print("[!] Butuh URL base")
            sys.exit(1)
        bruteforce_endpoint(sys.argv[2])
    
    elif arg1 == '--headers':
        if len(sys.argv) < 3:
            print("[!] Butuh URL")
            sys.exit(1)
        scan_headers(sys.argv[2])
    
    else:
        url = arg1
        method = sys.argv[2] if len(sys.argv) > 2 else 'GET'
        data = None
        if len(sys.argv) > 3:
            try:
                data = json.loads(sys.argv[3])
            except json.JSONDecodeError:
                print("[!] JSON gak valid")
                sys.exit(1)
        
        scrape_api(url, method, data=data)
