'use client';
import { useEffect } from 'react';

export default function WakeLock() {
  useEffect(() => {
    let lock = null;
    const acquire = async () => {
      try {
        if ('wakeLock' in navigator) {
          lock = await navigator.wakeLock.request('screen');
        }
      } catch(e) {}
    };
    acquire();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') acquire();
    });
    return () => { if (lock) lock.release(); };
  }, []);
  return null;
}