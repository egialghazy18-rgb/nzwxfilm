'use client';
import { useTheme } from '../context/ThemeContext';
export default function DarkToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} style={{
      width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
      background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 18, transition: 'all 0.2s',
    }}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
