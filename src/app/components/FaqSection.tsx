import Image from 'next/image';
import { FaQ } from './Faq';

export const FaqSection = ({ faqData }: { faqData: { title: string; body: string }[] }) => {
  return (
    <section className='relative w-full pb-[120px] max-md:pb-15 pt-[120px] max-md:pt-20 px-4 sm:px-10 bg-[#F6F6F6] overflow-hidden'>
      <Image
        src='/images/solution-bg.webp'
        alt='background decoration'
        fill
        quality={70}
        loading='lazy'
        className='relative top-0 left-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none'
      />
      <div className='flex flex-col items-center justify-center mx-auto'>
        <FaQ faqData={faqData} />
      </div>
    </section>
  );
};
