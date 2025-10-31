// BenefitCard.tsx
'use client';
import { Benefit } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);

  const hoverClass = isMobile ? '' : 'group-hover:';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0`}
      onClick={onClick}
    >
      <div
        className={`relative w-full transition-all duration-800 
          ${
            isOpen
              ? 'h-[260px] sm:h-[260px]'
              : `h-[325px] sm:h-[365px] ${hoverClass}h-[260px] ${hoverClass}sm:h-[260px]`
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
            ${isOpen ? 'max-h-[300px]' : `lg:max-h-[53px] max-h-[44px] ${hoverClass}max-h-[300px]`}
          `}
        >
          <p className='text-sm lg:text-base'>{benefit?.description}</p>
        </div>

        <Link
          href={href}
          onClick={(e) => e.stopPropagation()}
          className={`mt-0 transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full 
            ${
              isOpen
                ? 'mt-4 lg:ml-auto lg:w-max w-full flex justify-center'
                : `lg:ml-auto lg:w-max w-full hidden justify-center ${hoverClass}flex ${hoverClass}mt-4`
            }
          `}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

// 'use client';
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
//     <div
//       className={`cursor-pointer group bg-white rounded-xl overflow-hidden flex flex-col text-center transition-all duration-800 max-w-full sm:max-w-[475px] mx-auto lg:mx-0`}
//       onClick={onClick}
//       style={{ touchAction: 'manipulation' }}
//     >
//       <div
//         className={`relative w-full transition-all duration-800
//           ${
//             isOpen
//               ? 'h-[260px] sm:h-[260px]' // Стилі при КЛІКУ
//               : 'h-[325px] sm:h-[365px] group-hover:h-[260px] sm:group-hover:h-[260px]' // Стилі при ЗАКРИТОМУ СТАНІ (і hover)
//           }
//         `}
//       >
//         <Image
//           src={benefit?.photo?.url ?? ''}
//           alt='Member benefits'
//           layout='fill'
//           objectFit='cover'
//           className='w-full h-full transition-all duration-500'
//         />
//       </div>

//       <div className='p-6 lg:p-8 text-start flex flex-col flex-1'>
//         <h3 className='font-semibold text-[24px] sm:text-[34px] leading-tight mb-4'>{benefit?.title}</h3>

//         <div
//           className={`relative overflow-hidden transition-all duration-800 ease-in-out
//             ${isOpen ? 'max-h-[300px]' : 'lg:max-h-[53px] max-h-[44px] group-hover:max-h-[300px]'}
//           `}
//         >
//           <p className='text-sm lg:text-base'>{benefit?.description}</p>
//         </div>

//         <Link
//           href={href}
//           className={`mt-0 transition-all duration-800 delay-200 text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 px-6 py-2 sm:px-7 sm:py-3 rounded-full
//             ${
//               isOpen
//                 ? 'mt-4 lg:ml-auto lg:w-max w-full flex justify-center' // Стилі при КЛІКУ (Показати)
//                 : 'lg:ml-auto lg:w-max w-full hidden justify-center group-hover:flex group-hover:mt-4' // Стилі при ЗАКРИТОМУ СТАНІ (Сховати, але показати при hover)
//             }
//           `}
//         >
//           Read more
//         </Link>
//       </div>
//     </div>
//   );
// };
