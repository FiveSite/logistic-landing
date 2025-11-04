import Head from 'next/head';
import Image from 'next/image';

export const MainBackground = () => {
  return (
    <div>
      <Head>
        <link rel='preload' as='image' href='/images/main-bg.png' />
      </Head>
      <Image
        src='/images/main-bg.png'
        alt='main-bg'
        fill
        priority
        fetchPriority='high'
        quality={80}
        sizes='100vw'
        className='object-cover object-center'
      />
    </div>
  );
};
