import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import BottomNav from './components/BottomNav';
import WakeLock from './components/WakeLock';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';
import PWAInstall from './components/PWAInstall';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NzwxFilm',
  description: 'Nonton film & series online',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className} style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        <ThemeProvider>
          <SplashScreen />
          <WakeLock />
          <PWAInstall />
          <PageTransition>{children}</PageTransition>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
