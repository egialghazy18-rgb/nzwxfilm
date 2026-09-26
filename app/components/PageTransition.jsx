'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function PageTransition({ children }) {
  const path = usePathname();
  const [visible, setVisible] = useState(true);
  const [content, setContent] = useState(children);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setVisible(false);
    const t = setTimeout(() => {
      setContent(children);
      setVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [path]);

  useEffect(() => { setContent(children); }, [children]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    }}>
      {content}
    </div>
  );
}