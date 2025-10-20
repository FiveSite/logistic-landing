'use client';
import { fetchBenefits } from '@/services/api';
import { Benefit } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Benefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const getData = async () => {
    const data = await fetchBenefits();
    setBenefits(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='bg-[#F6F6F6] lg:py-40 py-20 bg-[url("/images/about-decor.png")] w-full bg-no-repeat bg-cover'>
      {benefits.length > 0 && (
        <div className='mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[120px] px-4 md:px-10 xl:px-[180px] max-w-screen-xl'>
          {/* Left Block */}
          <div className='flex-1'>
            <h2 className='text-[clamp(32px,5vw,60px)] leading-tight font-bold text-orange-600 mb-6 max-lg:text-center'>
              Membership <br className='hidden lg:block' /> benefits
            </h2>
            <p className='text-base mb-8 max-lg:text-center'>
              As a member, you gain access to exclusive resources, networking opportunities, and tailored support
              designed to help your business grow and succeed.
            </p>

            {/* First benefit card */}
            <div className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500  max-w-full sm:max-w-[475px] mx-auto lg:mx-0'>
              <div className='relative w-full h-[250px] sm:h-[365px]'>
                <Image
                  src={benefits[0]?.photo?.url ?? ''}
                  alt='Member benefits'
                  layout='fill'
                  objectFit='cover'
                  className='w-full h-full'
                />
              </div>

              <div className='p-6 lg:p-8 pb-0 lg:pb-0 text-start flex flex-col flex-1'>
                <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefits[0]?.title}</h3>

                <div className='relative overflow-hidden transition-all duration-500 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
                  <p className='text-sm lg:text-base'>{benefits[0]?.description}</p>
                  <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
                </div>

                <Link
                  href='/about#membership-standards'
                  className='mt-4 lg:ml-auto lg:w-max w-full flex justify-center opacity-0 group-hover:opacity-100 group-hover:mb-6 lg:group-hover:mb-8 transition-all duration-600 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>

          {/* Right Block with 2 cards */}
          <div className='flex flex-col gap-8 flex-1'>
            {[1, 2].map((index) => (
              <div
                key={index}
                className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500  max-w-full sm:max-w-[475px] mx-auto lg:mx-0'
              >
                <div className='relative w-full h-[250px] sm:h-[365px]'>
                  <Image
                    src={benefits[index]?.photo?.url || ''}
                    alt='Member benefits'
                    layout='fill'
                    objectFit='cover'
                    className='w-full h-full'
                  />
                </div>

                <div className='p-6 lg:p-8 pb-0 lg:pb-0 text-start flex flex-col flex-1'>
                  <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>
                    {benefits[index]?.title}
                  </h3>

                  <div className='relative overflow-hidden transition-all duration-500 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
                    <p className='text-sm sm:text-base'>{benefits[index]?.description}</p>
                    <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
                  </div>

                  <Link
                    href={index === 1 ? '/about#risk-management' : '/about#financial-protection'}
                    className='mt-4 lg:ml-auto lg:w-max w-full flex justify-center opacity-0 group-hover:opacity-100 group-hover:mb-6 lg:group-hover:mb-8 transition-all duration-600 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// 'use client';
// import { fetchBenefits } from '@/services/api';
// import { Benefit } from '@/types';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export const Benefits = () => {
//   const [benefits, setBenefits] = useState<Benefit[]>([]);

//   const getData = async () => {
//     const data = await fetchBenefits();
//     setBenefits(data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <section className='bg-[#F6F6F6] py-40 bg-[url("/images/about-decor.png")] bg-no-repeat bg-cover'>
//       {benefits.length > 0 && (
//         <div className='mx-auto flex gap-[120px] px-[180px]'>
//           <div className='flex-1'>
//             <h2 className='text-[60px] leading-[60px]  font-bold text-orange-600 mb-6'>
//               Membership
//               <br />
//               benefits
//             </h2>
//             <p className='text-[16px] mb-15'>
//               As a member, you gain access to exclusive resources, networking opportunities, and tailored support
//               designed to help your business grow and succeed.
//             </p>

//             <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
//               <div className='relative'>
//                 <Image
//                   src={benefits[0]?.photo?.url ?? ''}
//                   alt='Member benefits'
//                   width={475}
//                   height={365}
//                   className='w-[475px] h-[365px]'
//                 />
//               </div>

//               {/* Контейнер тексту */}
//               <div className='p-8 pb-0 text-start flex flex-col flex-1'>
//                 <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[0]?.title}</h3>

//                 {/* Контейнер з max-height для анімації "виїзду" */}
//                 <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
//                   <p className='text-[16px]'>{benefits[0]?.description}</p>

//                   {/* Плавний fade для крапок (імітація "...") */}
//                   <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
//                 </div>

//                 <Link
//                   href='/about#membership-standards'
//                   className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
//                 >
//                   Read more
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className='flex flex-col gap-20 flex-1'>
//             <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
//               <div className='relative'>
//                 <Image
//                   src={benefits[1]?.photo?.url ?? ''}
//                   alt='Member benefits'
//                   width={475}
//                   height={365}
//                   className='w-[475px] h-[365px]'
//                 />
//               </div>

//               {/* Контейнер тексту */}
//               <div className='p-8 pb-0 text-start flex flex-col flex-1'>
//                 <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[1]?.title}</h3>

//                 {/* Контейнер з max-height для анімації "виїзду" */}
//                 <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
//                   <p className='text-[16px]'>{benefits[1]?.description}</p>

//                   {/* Плавний fade для крапок (імітація "...") */}
//                   <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
//                 </div>

//                 {/* Кнопка */}
//                 <Link
//                   href='/about#risk-management'
//                   className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
//                 >
//                   Read more
//                 </Link>
//               </div>
//             </div>

//             <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
//               <div className='relative'>
//                 <Image
//                   src={benefits[2]?.photo?.url || ''}
//                   alt='Member benefits'
//                   width={475}
//                   height={365}
//                   className='w-[475px] h-[365px]'
//                 />
//               </div>

//               {/* Контейнер тексту */}
//               <div className='p-8 pb-0 text-start flex flex-col flex-1'>
//                 <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[2]?.title}</h3>

//                 {/* Контейнер з max-height для анімації "виїзду" */}
//                 <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
//                   <p className='text-[16px]'>{benefits[2]?.description}</p>

//                   {/* Плавний fade для крапок (імітація "...") */}
//                   <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
//                 </div>

//                 {/* Кнопка */}
//                 <Link
//                   href='/about#financial-protection'
//                   className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
//                 >
//                   Read more
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
