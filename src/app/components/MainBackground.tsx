import Image from 'next/image';

export const MainBackground = () => {
  return (
    <div>
      {' '}
      <Image
        src='/images/main-bg.png'
        alt='main-bg'
        fill
        priority
        fetchPriority='high'
        quality={85}
        sizes='100vw'
        className='object-cover object-center'
      />
    </div>
  );
};
