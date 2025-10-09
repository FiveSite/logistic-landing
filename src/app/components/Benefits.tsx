'use client';
import { fetchBenefits } from '@/services/api';
import { Benefit } from '@/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export const Benefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const data = await fetchBenefits();
    setBenefits(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='bg-[#F6F6F6] py-40 bg-[url("/images/about-decor.png")] bg-no-repeat bg-cover'>
      {benefits.length > 0 && (
        <div className='mx-auto flex gap-[120px] px-[180px]'>
          <div className='flex-1'>
            <h2 className='text-[60px] leading-[60px]  font-bold text-orange-600 mb-6'>
              Membership
              <br />
              benefits
            </h2>
            <p className='text-[16px] mb-15'>
              As a member, you gain access to exclusive resources, networking opportunities, and tailored support
              designed to help your business grow and succeed.
            </p>

            <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
              <div className='relative'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[0]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={365}
                  className='w-[475px] h-[365px]'
                />
              </div>

              {/* Контейнер тексту */}
              <div className='p-8 pb-0 text-start flex flex-col flex-1'>
                <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[0]?.title}</h3>

                {/* Контейнер з max-height для анімації "виїзду" */}
                <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
                  <p className='text-[16px]'>{benefits[0]?.description}</p>

                  {/* Плавний fade для крапок (імітація "...") */}
                  <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
                </div>

                {/* Кнопка */}
                <Link
                  href='/about'
                  className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-20 flex-1'>
            <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
              <div className='relative'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[1]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={365}
                  className='w-[475px] h-[365px]'
                />
              </div>

              {/* Контейнер тексту */}
              <div className='p-8 pb-0 text-start flex flex-col flex-1'>
                <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[1]?.title}</h3>

                {/* Контейнер з max-height для анімації "виїзду" */}
                <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
                  <p className='text-[16px]'>{benefits[1]?.description}</p>

                  {/* Плавний fade для крапок (імітація "...") */}
                  <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
                </div>

                {/* Кнопка */}
                <Link
                  href='/about'
                  className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
                >
                  Read more
                </Link>
              </div>
            </div>

            <div className='cursor-pointer group bg-white max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center transition-all duration-500'>
              <div className='relative'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[2]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={365}
                  className='w-[475px] h-[365px]'
                />
              </div>

              {/* Контейнер тексту */}
              <div className='p-8 pb-0 text-start flex flex-col flex-1'>
                <h3 className='font-semibold text-[34px] leading-[1] mb-4'>{benefits[2]?.title}</h3>

                {/* Контейнер з max-height для анімації "виїзду" */}
                <div className='relative overflow-hidden transition-all duration-500 ease-in-out max-h-[55px] group-hover:max-h-[300px]'>
                  <p className='text-[16px]'>{benefits[2]?.description}</p>

                  {/* Плавний fade для крапок (імітація "...") */}
                  <div className='absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none' />
                </div>

                {/* Кнопка */}
                <Link
                  href='/about'
                  className='mt-4 ml-auto w-max opacity-0 group-hover:opacity-100 group-hover:mb-8 transition-all duration-600 delay-200 text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-7 py-3 rounded-[100px]'
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
