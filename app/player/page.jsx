export default async function PlayerPage({ searchParams }) {
  const params = await searchParams;
  const src = params?.src;
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
