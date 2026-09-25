'use client';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function WatchlistBtn({ film }) {
  const [list, setList] = useLocalStorage('watchlist', []);
  const saved = list.some(f => f.id === film.id);

  const toggle = () => {
    setList(prev =>
      saved ? prev.filter(f => f.id !== film.id) : [film, ...prev].slice(0, 100)
    );
  };

  return (
    <button onClick={toggle} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '9px 18px', borderRadius: 100, cursor: 'pointer',
      fontWeight: 700, fontSize: 13, fontFamily: 'Inter, sans-serif',
      background: saved ? '#1565c0' : 'rgba(21,101,192,0.1)',
      color: saved ? '#fff' : '#1565c0',
      border: saved ? '1.5px solid #1565c0' : '1.5px solid rgba(21,101,192,0.3)',
      transition: 'all 0.2s',
    }}>
      {saved ? '✓ Tersimpan' : '+ Watchlist'}
    </button>
  );
}
