import { Benefit } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export const BenefitsSection = ({ benefits }: { benefits: Benefit[] }) => {
  return (
    <section className='bg-[#F6F6F6] lg:py-40 lg:pt-[200px] py-20 w-full '>
      <div className='bg-[url("/images/about-decor.png")] bg-no-repeat bg-cover'>
        {benefits.length > 0 && (
          <div className='mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[120px] px-4 md:px-10 xl:px-[180px] max-w-[1430px]'>
            {/* Left Block */}
            <div className='flex-1'>
              <h2 className='lg:mt-[-80px] text-[clamp(32px,5vw,60px)] leading-tight font-bold text-orange-600 mb-6 max-lg:text-center'>
                Membership <br className='hidden lg:block' /> benefits
              </h2>
              <p className='text-base mb-8 max-lg:text-center'>
                As a member, you gain access to exclusive resources, networking opportunities, and tailored support
                designed to help your business grow and succeed.
              </p>

              <div className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0'>
                <div className='relative w-full h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px] transition-all duration-800'>
                  <Image
                    src={benefits[0]?.photo?.url ?? ''}
                    alt='Member benefits'
                    layout='fill'
                    objectFit='cover'
                    className='w-full h-full transition-all duration-500'
                  />
                </div>

                <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
                  <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefits[0]?.title}</h3>

                  <div className='relative overflow-hidden transition-all duration-800 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
                    <p className='text-sm lg:text-base'>{benefits[0]?.description}</p>
                    <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-800 pointer-events-none' />
                  </div>

                  <Link
                    href='/about#risk-management'
                    className='mt-0 group-hover:mt-4 lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex  transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-8 lg:gap-24 flex-1'>
              <div className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0'>
                <div className='relative w-full h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px] transition-all duration-800'>
                  <Image
                    src={benefits[1]?.photo?.url || ''}
                    alt='Member benefits'
                    layout='fill'
                    objectFit='cover'
                    className='w-full h-full transition-all duration-500'
                  />
                </div>

                <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
                  <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefits[1]?.title}</h3>

                  <div className='relative overflow-hidden transition-all duration-800 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
                    <p className='text-sm lg:text-base'>{benefits[1]?.description}</p>
                    <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-800 pointer-events-none' />
                  </div>

                  <Link
                    href={'/about#membership-standards'}
                    className='mt-0 group-hover:mt-4 lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex  transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
                  >
                    Read more
                  </Link>
                </div>
              </div>
              <div className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0'>
                <div className='relative w-full h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px] transition-all duration-800'>
                  <Image
                    src={benefits[2]?.photo?.url || ''}
                    alt='Member benefits'
                    layout='fill'
                    objectFit='cover'
                    className='w-full h-full transition-all duration-500'
                  />
                </div>

                <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
                  <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefits[2]?.title}</h3>

                  <div className='relative overflow-hidden transition-all duration-800 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
                    <p className='text-sm lg:text-base'>{benefits[2]?.description}</p>
                    <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-800 pointer-events-none' />
                  </div>

                  <Link
                    href={'/about#financial-protection'}
                    className='mt-0 group-hover:mt-4 lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex  transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
