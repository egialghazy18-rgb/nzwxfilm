import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import BottomNav from './components/BottomNav';
import WakeLock from './components/WakeLock';
import PWAInstall from './components/PWAInstall';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NzwxFilm',
  description: 'Nonton film & series online',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <WakeLock />
          <PWAInstall />
          {children}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
