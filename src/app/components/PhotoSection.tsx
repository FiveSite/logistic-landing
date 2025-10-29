import { Media } from '@/types';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import Link from 'next/link';

export const PhotoSection = ({
  consultationData,
}: {
  consultationData: { title: string; afterTitle: string; image: Media }[];
}) => {
  return (
    <section className='bg-[#F6F6F6] sm:px-10 w-full lg:pt-[120px] pt-20'>
      <div
        className='relative sm:h-[400px] h-[680px] w-full bg-no-repeat bg-cover bg-center sm:rounded-[20px] overflow-hidden'
        style={{ backgroundImage: `url('${consultationData[0].image?.url}')` || `url('/images/lorry-bg.png')` }}
      >
        <div className='absolute inset-0 bg-black/40 z-10 sm:rounded-[20px] pointer-events-none' />

        <div className='absolute inset-0 z-20 flex flex-col  justify-center lg:px-20 px-6 max-sm:py-20 sm:py-20'>
          <h2 className='text-white text-[34px] leading-[34px] font-semibold max-w-[500px] mb-6'>
            {consultationData[0].title}
          </h2>
          <p className='text-white text-[16px] max-w-[500px] sm:mb-8 mb-6'>{consultationData[0].afterTitle}</p>

          <Link
            href='/about#contact-us'
            className='text-white text-[16px] font-semibold bg-orange-600 hover:bg-orange-700 w-fit rounded-[100px] cursor-pointer flex items-center gap-2 px-10 py-3'
          >
            Contact us
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
