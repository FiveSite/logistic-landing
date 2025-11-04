'use client';

import { Benefit } from '@/types';
import { useState } from 'react';
import { BenefitCard } from './BenefitCard';
// import Image from 'next/image';

export const BenefitsSection = ({ benefits }: { benefits: Benefit[] }) => {
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const toggleCardClick = (id: number) => {
    setOpenCardId((prevState) => (prevState === id ? null : id));
  };

  return (
    <section className='bg-[#F6F6F6] lg:py-40 lg:pt-[200px] py-20 w-full '>
      <div className='bg-[url("/images/about-decor.png")] bg-no-repeat w-full bg-cover'>
        {benefits.length > 0 && (
          <div className='mx-auto flex flex-col lg:flex-row gap-8 lg:gap-[120px] px-4 md:px-10 xl:px-[180px] max-w-[1430px]'>
            <div className='flex-1'>
              <h2 className='lg:mt-[-80px] text-[clamp(32px,5vw,60px)] leading-tight font-bold text-orange-600 mb-6 max-lg:text-center'>
                Membership <br className='hidden lg:block' /> benefits
              </h2>
              <p className='text-base mb-8 max-lg:text-center'>
                As a member, you gain access to exclusive resources, networking opportunities, and tailored support
                designed to help your business grow and succeed.
              </p>
              <BenefitCard
                benefit={benefits[0]}
                href='/about#risk-management'
                onClick={() => toggleCardClick(benefits[0].id)}
                isOpen={openCardId === benefits[0].id}
              />
            </div>
            <div className='flex flex-col gap-8 lg:gap-24 flex-1'>
              <BenefitCard
                benefit={benefits[1]}
                href='/about#membership-standards'
                onClick={() => toggleCardClick(benefits[1].id)}
                isOpen={openCardId === benefits[1].id}
              />
              <BenefitCard
                benefit={benefits[2]}
                href='/about#financial-protection'
                onClick={() => toggleCardClick(benefits[2].id)}
                isOpen={openCardId === benefits[2].id}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
