import requests
from bs4 import BeautifulSoup
import json

def scrape_film_info(title):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    urls = [
        'https://www.imdb.com/title/tt4154796/',
        'https://www.themoviedb.org/movie/299534',
        'https://www.rottentomatoes.com/m/avengers_endgame'
    ]
    
    results = []
    for url in urls:
        try:
            res = requests.get(url, headers=headers, timeout=15)
            if res.status_code == 200:
                soup = BeautifulSoup(res.text, 'html.parser')
                results.append({
                    'source': url,
                    'title': soup.title.string if soup.title else 'N/A',
                    'status': res.status_code
                })
        except Exception as e:
            results.append({'source': url, 'error': str(e)})
    
    return results

if __name__ == "__main__":
    info = scrape_film_info("Avengers Endgame Encore")
    print(json.dumps(info, indent=2))
