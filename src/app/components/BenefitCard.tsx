'use client';
import { Benefit } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const BenefitCard = ({
  benefit,
  href,
  onClick,
  isOpen,
}: {
  benefit: Benefit;
  href: string;
  onClick: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0`}
      onClick={onClick}
    >
      <div
        className={`relative w-full transition-all duration-800 
          ${
            isOpen
              ? 'h-[260px] sm:h-[260px]' // Стилі при КЛІКУ
              : 'h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px]' // Стилі при ЗАКРИТОМУ СТАНІ (і hover)
          }
        `}
      >
        <Image
          src={benefit?.photo?.url ?? ''}
          alt='Member benefits'
          layout='fill'
          objectFit='cover'
          className='w-full h-full transition-all duration-500'
        />
      </div>

      <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
        <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefit?.title}</h3>

        <div
          className={`relative overflow-hidden transition-all duration-800 ease-in-out 
            ${isOpen ? 'max-h-[300px]' : 'lg:max-h-[53px] max-h-[44px] group-hover:max-h-[300px]'}
          `}
        >
          <p className='text-sm lg:text-base'>{benefit?.description}</p>
        </div>

        <Link
          href={href}
          className={`mt-0 transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full 
            ${
              isOpen
                ? 'mt-4 lg:ml-auto lg:w-max w-full flex justify-center' // Стилі при КЛІКУ (Показати)
                : 'lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex group-hover:mt-4' // Стилі при ЗАКРИТОМУ СТАНІ (Сховати, але показати при hover)
            }
          `}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
// import { Benefit } from '@/types';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// export const BenefitCard = ({
//   benefit,
//   href,
//   onClick,
//   isOpen,
// }: {
//   benefit: Benefit;
//   href: string;
//   onClick: () => void;
//   isOpen: boolean;
// }) => {
//   return (
//     <div className='flex-1 ' onClick={onClick}>
//       <h2 className='lg:mt-[-80px] text-[clamp(32px,5vw,60px)] leading-tight font-bold text-orange-600 mb-6 max-lg:text-center'>
//         Membership <br className='hidden lg:block' /> benefits
//       </h2>
//       <p className='text-base mb-8 max-lg:text-center'>
//         As a member, you gain access to exclusive resources, networking opportunities, and tailored support designed to
//         help your business grow and succeed.
//       </p>

//       <div className='cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0'>
//         <div className='relative w-full h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px] transition-all duration-800'>
//           <Image
//             src={benefit?.photo?.url ?? ''}
//             alt='Member benefits'
//             layout='fill'
//             objectFit='cover'
//             className='w-full h-full transition-all duration-500'
//           />
//         </div>

//         <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
//           <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefit?.title}</h3>

//           <div className='relative overflow-hidden transition-all duration-800 ease-in-out lg:max-h-[56px] max-h-[46px] group-hover:max-h-[300px]'>
//             <p className='text-sm lg:text-base'>{benefit?.description}</p>
//             <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-800 pointer-events-none' />
//           </div>

//           <Link
//             href={href}
//             className='mt-0 group-hover:mt-4 lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex  transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full'
//           >
//             Read more
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
