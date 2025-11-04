import Head from 'next/head';
import Image from 'next/image';

export const MainBackground = () => {
  return (
    <div>
      <Head>
        <link rel='preload' as='image' href='/images/main-bg.webp' />
      </Head>
      <Image
        src='/images/main-bg.webp'
        alt='main-bg'
        fill
        priority
        fetchPriority='high'
        sizes='100vw'
        className='object-cover object-center'
      />
    </div>
  );
};
