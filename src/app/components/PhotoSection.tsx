import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import Link from 'next/link';

export const PhotoSection = () => {
  return (
    <section className='bg-[#F6F6F6] sm:px-10 w-full lg:pt-[120px] pt-20'>
      <div className="relative sm:h-[400px] w-full bg-no-repeat bg-cover bg-center sm:rounded-[20px] overflow-hidden sm:bg-[url('/images/lorry-bg.png')] bg-[url('/images/lorry-bg-min.png')] ">
        <div className="absolute top-0 left-0 h-full w-[600px] sm:bg-[url('/images/gradient-dark.png')] bg-cover bg-no-repeat bg-left z-10 rounded-l-[20px]" />

        <div className='sm:absolute top-25 left-0 h-full w-full z-20 flex flex-col justify-start lg:px-20 px-6 max-sm:py-40'>
          <h2 className='text-white text-[34px] leading-[34px] font-semibold max-w-[500px] mb-6'>
            Move Your Business Forward With Logistics You Can Trust
          </h2>
          <p className='text-white text-[16px] max-w-[500px] sm:mb-8 mb-6'>
            Fast, reliable, and transparent delivery solutions tailored to your needs. From warehouse to destination, we
            make every mile count.
          </p>

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
