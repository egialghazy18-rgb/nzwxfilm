export default function PlayerPage({ searchParams }) {
  const { src } = searchParams;
  if (!src) return <div>No source</div>;
  return (
    <html>
      <body style={{margin:0,padding:0,background:'#000'}}>
        <iframe
          src={src}
          style={{width:'100vw',height:'100vh',border:'none'}}
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </body>
    </html>
  );
}
