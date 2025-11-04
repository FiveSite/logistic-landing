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
  title: 'African Alliance Logistics Network | Logistics Business Community',
  description:
    'Connect, grow, and expand your logistics business across Africa. Join the African Alliance Logistic Network and unlock new opportunities for your business.',
  keywords: [
    'African Alliance Logistics Network',
    'Logistics Business Community',
    'freight forwarding alliance',
    'Africa logistics network',

    'logistics professionals',
    'logistics business growth',
    'supply chain network',
    'B2B logistics partners',
    'logistics networking',
    'freight forwarder network',

    'logistics in Africa',
    'international freight forwarding',
    'customs brokerage services',
    'ocean freight Africa',
    'air freight Africa',
    'African logistics market',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'African Alliance Logistics Network',
    description: 'Connect African freight forwarders and global logistics partners to grow your business.',
    url: 'https://www.african-alliance.network',
    siteName: 'African Alliance Network',
    type: 'website',
  },
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
