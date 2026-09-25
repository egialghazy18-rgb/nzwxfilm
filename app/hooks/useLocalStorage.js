'use client';
import { useState, useEffect } from 'react';
export function useLocalStorage(key, initial) {
  const [val, setVal] = useState(initial);
  useEffect(() => { try { const s = localStorage.getItem(key); if (s) setVal(JSON.parse(s)); } catch {} }, [key]);
  const set = (v) => { const next = typeof v === 'function' ? v(val) : v; setVal(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch {} };
  return [val, set];
}
