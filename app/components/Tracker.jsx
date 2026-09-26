'use client';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

function getSession() {
  try {
    let s = localStorage.getItem('session_id');
    if (!s) { s = Math.random().toString(36).slice(2); localStorage.setItem('session_id', s); }
    return s;
  } catch { return 'anon'; }
}

export function TrackVisitor({ page = '/' }) {
  useEffect(() => {
    supabase.from('visitors').insert({ session_id: getSession(), page }).then(() => {});
  }, [page]);
  return null;
}

export function TrackFilm({ filmId, title, poster, type }) {
  useEffect(() => {
    if (!filmId) return;
    supabase.from('film_views').insert({ film_id: String(filmId), title, poster, type }).then(() => {});
  }, [filmId]);
  return null;
}
