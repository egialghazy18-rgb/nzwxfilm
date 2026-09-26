'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

const PASS = 'egii2025';

function StatCard({ label, value, icon, dark }) {
  return (
    <div style={{ background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '20px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.9)', flex: 1, minWidth: 140 }}>
      <div style={{ marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: dark ? '#fff' : '#1a237e' }}>{value}</div>
      <div style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.5)' : '#78909c', fontWeight: 500, marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function DeveloperPage() {
  const { dark } = useTheme();
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [stats, setStats] = useState({ today: 0, week: 0, total: 0, online: 0 });
  const [topFilms, setTopFilms] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = () => {
    if (pass === PASS) { setAuth(true); localStorage.setItem('dev_auth', '1'); }
    else alert('Password salah!');
  };

  useEffect(() => {
    if (localStorage.getItem('dev_auth') === '1') setAuth(true);
  }, []);

  useEffect(() => {
    if (!auth) return;
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [auth]);

  async function fetchStats() {
    try {
      const now = new Date();
      const todayStart = new Date(now); todayStart.setHours(0,0,0,0);
      const weekStart = new Date(now); weekStart.setDate(now.getDate() - 7);
      const onlineStart = new Date(now - 5 * 60 * 1000);

      const [todayRes, weekRes, totalRes, onlineRes, filmsRes, recentRes] = await Promise.all([
        supabase.from('visitors').select('id', { count: 'exact' }).gte('visited_at', todayStart.toISOString()),
        supabase.from('visitors').select('id', { count: 'exact' }).gte('visited_at', weekStart.toISOString()),
        supabase.from('visitors').select('id', { count: 'exact' }),
        supabase.from('visitors').select('id', { count: 'exact' }).gte('visited_at', onlineStart.toISOString()),
        supabase.from('film_views').select('film_id, title, poster, type').order('id', { ascending: false }),
        supabase.from('visitors').select('session_id, page, visited_at').order('visited_at', { ascending: false }).limit(10),
      ]);

      setStats({
        today: todayRes.count || 0,
        week: weekRes.count || 0,
        total: totalRes.count || 0,
        online: onlineRes.count || 0,
      });

      // Hitung top films
      const filmMap = {};
      (filmsRes.data || []).forEach(f => {
        if (!filmMap[f.film_id]) filmMap[f.film_id] = { ...f, count: 0 };
        filmMap[f.film_id].count++;
      });
      const sorted = Object.values(filmMap).sort((a,b) => b.count - a.count).slice(0, 10);
      setTopFilms(sorted);
      setRecentVisitors(recentRes.data || []);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }

  const bg = dark ? 'linear-gradient(180deg,#0a0a1a 0%,#0d1b3e 100%)' : 'linear-gradient(180deg,#dff0fc 0%,#a8d4f5 30%,#0b3270 100%)';
  const txt = dark ? '#fff' : '#1a237e';
  const card = dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)';
  const border = dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.9)';

  if (!auth) return (
    <main style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: card, backdropFilter: 'blur(12px)', borderRadius: 24, padding: 32, border, width: '100%', maxWidth: 340 }}>
        <div style={{ marginBottom: 8 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={dark?'#4fc3f7':'#1565c0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: txt, marginBottom: 4 }}>Developer Panel</h1>
        <p style={{ fontSize: 13, color: dark?'rgba(255,255,255,0.5)':'#78909c', marginBottom: 24 }}>NzwxFilm by Egii</p>
        <input
          type="password" placeholder="Password"
          value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: dark?'1.5px solid rgba(255,255,255,0.15)':'1.5px solid rgba(21,101,192,0.2)', background: dark?'rgba(255,255,255,0.08)':'#fff', color: dark?'#fff':'#1a237e', fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
        />
        <button onClick={login} style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#1565c0', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
          Masuk
        </button>
      </div>
    </main>
  );

  return (
    <main style={{ minHeight: '100vh', background: bg, paddingBottom: 100 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 16px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: txt }}>Developer Panel</h1>
            <p style={{ fontSize: 12, color: dark?'rgba(255,255,255,0.4)':'#78909c' }}>NzwxFilm • Auto refresh 10 detik</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: stats.online > 0 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.1)', border: stats.online > 0 ? '1px solid rgba(34,197,94,0.3)' : border }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: stats.online > 0 ? '#22c55e' : '#78909c', animation: stats.online > 0 ? 'pulse-green 2s infinite' : 'none' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: stats.online > 0 ? '#22c55e' : dark?'rgba(255,255,255,0.4)':'#78909c' }}>{stats.online} online</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <StatCard dark={dark} label="Pengunjung Hari Ini" value={loading ? '...' : stats.today}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
          <StatCard dark={dark} label="Minggu Ini" value={loading ? '...' : stats.week}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} />
          <StatCard dark={dark} label="Total Pengunjung" value={loading ? '...' : stats.total}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} />
        </div>

        {/* Top Films */}
        <div style={{ background: card, backdropFilter: 'blur(12px)', borderRadius: 20, padding: 20, border, marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: txt, marginBottom: 16, paddingLeft: 12, borderLeft: '4px solid #4fc3f7' }}>Film Paling Banyak Ditonton</h2>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Array.from({length:5}).map((_,i) => <div key={i} style={{ height: 56, borderRadius: 12, background: dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)', animation: 'pulse 1.5s infinite' }} />)}
            </div>
          ) : topFilms.length === 0 ? (
            <p style={{ color: dark?'rgba(255,255,255,0.3)':'#90a4ae', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Belum ada data</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {topFilms.map((f, i) => (
                <a key={f.film_id} href={`/watch/${f.film_id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 14, background: dark?'rgba(255,255,255,0.05)':'rgba(21,101,192,0.05)', border: dark?'1px solid rgba(255,255,255,0.08)':'1px solid rgba(21,101,192,0.1)', textDecoration: 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : dark?'rgba(255,255,255,0.1)':'rgba(21,101,192,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i < 3 ? '#fff' : dark?'rgba(255,255,255,0.5)':'#78909c', flexShrink: 0 }}>{i+1}</div>
                  {f.poster && <img src={f.poster} alt={f.title} style={{ width: 36, height: 54, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: txt, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title}</p>
                    <p style={{ fontSize: 11, color: dark?'rgba(255,255,255,0.4)':'#78909c' }}>{f.type === 'tv' ? 'Series' : 'Film'}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: dark?'rgba(79,195,247,0.15)':'rgba(21,101,192,0.1)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4fc3f7' }}>{f.count}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Recent Visitors */}
        <div style={{ background: card, backdropFilter: 'blur(12px)', borderRadius: 20, padding: 20, border }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: txt, marginBottom: 16, paddingLeft: 12, borderLeft: '4px solid #4fc3f7' }}>Aktivitas Terbaru</h2>
          {recentVisitors.length === 0 ? (
            <p style={{ color: dark?'rgba(255,255,255,0.3)':'#90a4ae', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Belum ada aktivitas</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentVisitors.map((v, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 12, background: dark?'rgba(255,255,255,0.04)':'rgba(21,101,192,0.04)', border: dark?'1px solid rgba(255,255,255,0.06)':'1px solid rgba(21,101,192,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: dark?'rgba(255,255,255,0.7)':'#546e7a' }}>{v.session_id.slice(0,8)}...</span>
                    <span style={{ fontSize: 11, color: dark?'rgba(255,255,255,0.35)':'#90a4ae' }}>{v.page}</span>
                  </div>
                  <span style={{ fontSize: 11, color: dark?'rgba(255,255,255,0.3)':'#90a4ae' }}>{new Date(v.visited_at).toLocaleTimeString('id-ID', {hour:'2-digit',minute:'2-digit'})}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={() => { localStorage.removeItem('dev_auth'); setAuth(false); }} style={{ marginTop: 20, width: '100%', padding: 12, borderRadius: 14, border: '1.5px solid rgba(229,57,53,0.3)', background: 'transparent', color: '#e53935', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
          Keluar
        </button>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}} @keyframes pulse-green{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </main>
  );
}
