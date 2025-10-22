import Image from 'next/image';
import { FaQ } from './Faq';

export const FaqSection = () => {
  return (
    <section className='relative w-full pb-[120px] max-md:pb-15 pt-[100px] max-md:pt-20 px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
      <Image
        src='/images/solution-bg.png'
        alt='background decoration'
        fill
        className='absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none'
        priority
      />
      <div className='flex flex-col items-center justify-center mx-auto'>
        <FaQ />
      </div>
    </section>
  );
};
