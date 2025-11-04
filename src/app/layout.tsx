import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Footer } from './components/Footer';
import clsx from 'clsx';
import { Header } from './components/Header';
import { cookies } from 'next/headers';
import { getUserFromToken } from '@/services/auth';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'African Alliance Logistic Network | Logistics Business Community',
  description:
    'Connect with other logistics professionals, grow your business, and expand your network in the logistics industry.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const user = await getUserFromToken(token ?? '');

  return (
    <html lang='en'>
      <body className={clsx(geistSans.variable, geistMono.variable, 'antialiased min-h-screen flex flex-col')}>
        <div className='absolute px-10 max-lg:px-0 lg:top-8 top-0 w-full'>
          <Header user={user} />
        </div>

        <main className='flex-grow'>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
