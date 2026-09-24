import yt_dlp

def download_lagu(query, output="lagu.%(ext)s"):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '320',
        }],
        'quiet': False,
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([f"ytsearch1:{query}"])

if __name__ == "__main__":
    download_lagu("Hey Daddy Daddy's Home")

