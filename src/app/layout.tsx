import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Footer } from './components/Footer';
//import { MobMenuWrapper } from './components/MobMenuWrapper'; // 👈 новий клієнтський компонент
import clsx from 'clsx';
import { Header } from './components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Logistics Landing',
  description: 'Modern logistics SaaS platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={clsx(geistSans.variable, geistMono.variable, 'antialiased')}>
        <div className='absolute px-10 max-md:px-0 md:top-8 top-0 w-full'>
          {/* <MobMenuWrapper /> 👈 нова логіка мобільного меню */}
          <Header />
        </div>

        {children}

        <Footer />
      </body>
    </html>
  );
}
