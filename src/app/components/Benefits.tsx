'use client';
import { fetchBenefits } from '@/services/api';
import { Benefit } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import Link from 'next/link';

export const Benefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  console.log('benefits', benefits);

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

            <div className='cursor-pointer group bg-white shadow max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center '>
              <div className='relative'>
                {' '}
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[0]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={390}
                  className=''
                />
                <div className='cursor-pointer absolute inset-0 bg-black/50  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Link
                    href={'/about'}
                    className='cursor-pointer flex items-center gap-2  text-white text-[16px] bg-orange-600/60 hover:bg-orange-600/80 px-7 py-3.5 rounded-[100px]'
                  >
                    Read more
                    <div className='flex items-center justify-center w-4 h-4'>
                      <ArrowRightIcon className='stroke-white' />
                    </div>
                  </Link>
                </div>
              </div>

              <div className='p-4 '>
                <h3 className='font-semibold text-lg'>{benefits[0]?.title}</h3>
                <p className='text-sm'>{benefits[0]?.description}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-20 flex-1'>
            {/* <div className='cursor-pointer group bg-white shadow max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center '>
              <div className='relative'>
                {' '}
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[1]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={390}
                  className=''
                />
                <div className='cursor-pointer absolute inset-0 bg-black/50  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Link
                    href={'/about'}
                    className='cursor-pointer flex items-center gap-2  text-white text-[16px] bg-orange-600/60 hover:bg-orange-600/80 px-7 py-3.5 rounded-[100px]'
                  >
                    Read more
                    <div className='flex items-center justify-center w-4 h-4'>
                      <ArrowRightIcon className='stroke-white' />
                    </div>
                  </Link>
                </div>
              </div>

              <div className='p-4 '>
                <h3 className='font-semibold text-lg'>{benefits[1]?.title}</h3>
                <p className='text-sm'>{benefits[1]?.description}</p>
              </div>
            </div> */}

            <div className='cursor-pointer group bg-white shadow max-w-[475px] rounded-xl overflow-hidden flex flex-col text-center '>
              <div className='relative'>
                {' '}
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${benefits[2]?.photo.url}`}
                  alt='Member benefits'
                  width={475}
                  height={390}
                  className=''
                />
                {/* Overlay on hover */}
                <div className='cursor-pointer absolute inset-0 bg-black/50  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Link
                    href={'/about'}
                    className='cursor-pointer flex items-center gap-2  text-white text-[16px] bg-orange-600/60 hover:bg-orange-600/80 px-7 py-3.5 rounded-[100px]'
                  >
                    Read more
                    <div className='flex items-center justify-center w-4 h-4'>
                      <ArrowRightIcon className='stroke-white' />
                    </div>
                  </Link>
                </div>
              </div>

              <div className='p-4 '>
                <h3 className='font-semibold text-lg'>{benefits[2]?.title}</h3>
                <p className='text-sm'>{benefits[2]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
