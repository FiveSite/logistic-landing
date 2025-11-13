'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useRef, useState, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import TagIcon from '../../../public/icons/tag.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import { News } from '@/types';
import { fetchNews } from '@/services/api';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import Link from 'next/link';

export const ArticlesNewsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [data, setData] = useState<News[]>([]);

  const getData = async () => {
    try {
      const data = await fetchNews();
      setData(data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='pt-[60px] max-md:pt-20 w-full max-w-[1124px] mx-auto'>
      <div className=' mx-auto max-md:px-4'>
        <Image src='/icons/news-icon.svg' alt='solution' width={118} height={32} className='mx-auto mb-4 sm:hidden' />
        <div className='flex items-center justify-between max-lg:justify-center mb-10'>
          <h2 className='text-3xl font-bold text-[#1D1D1F] sm:mb-4 text-left max-lg::text-center'>Latest news</h2>
          <Link
            href='/news'
            className='max-lg:hidden cursor-pointer flex items-center gap-2 w-fit text-[16px] rounded-[100px] font-semibold text-white bg-orange-600 hover:bg-orange-700 px-4 py-3'
          >
            Explore more news
            <div className='flex items-center justify-center w-5 h-5'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </Link>
        </div>
      </div>

      <div className='max-md:px-3 relative w-full max-w-[1120px] block mx-auto pl-4'>
        {/* Navigation Buttons */}
        <div className='flex justify-between items-center z-10 max-xl:hidden'>
          <button
            ref={prevRef}
            className='absolute top-1/2  left-[-40px] w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white hover:bg-orange-700 transition'
          >
            <div className='flex items-center justify-center w-4 h-4 rotate-180'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
          <button
            ref={nextRef}
            className='absolute  right-[-54px] top-1/2 w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white hover:bg-orange-700 transition'
          >
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
        </div>

        <Swiper
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={16}
          className='mx-auto max-w-[1120px] w-full'
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Keyboard, Autoplay]}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={2000}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 'auto',
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 2,
              centeredSlides: false,
            },
          }}
        >
          {data.map((item: News, index: number) => (
            <SwiperSlide key={index} className='max-w-[608px]'>
              <div className='flex flex-col'>
                <Image
                  src={item.photo?.url || ''}
                  alt='solution'
                  quality={75}
                  loading='lazy'
                  width={608}
                  height={354}
                  className='max-sm:rounded-b-none rounded-[8px] h-[354px] object-cover'
                />

                <div className='max-sm:bg-white max-sm:p-4 sm:mt-4 rounded-b-[8px] max-h-[246px]'>
                  <div className='text-[16px]  flex items-center gap-2 mb-5'>
                    <div className='flex items-center gap-2'>
                      <CalendarIcon className='w-4 h-4' />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <span>—</span>
                    <div className='flex items-center gap-2'>
                      <TagIcon className='w-4 h-4' />
                      {item.category}
                    </div>
                  </div>
                  <Link
                    href={`/news/${item.documentId}`}
                    className='hover:underline text-[30px] leading-tight max-sm:text-[24px] font-semibold mb-8  line-clamp-2 max-sm:h-[60px] h-[75px]'
                  >
                    {item.title}
                  </Link>
                  <p className='text-[16px] line-clamp-2'>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='max-lg:px-4'>
        <Link
          href='/news'
          className=' mt-8 lg:hidden max-lg:justify-center cursor-pointer max-sm:w-full flex items-center  gap-2 text-[16px] rounded-[100px] font-semibold text-white bg-orange-600 hover:bg-orange-700 px-4 py-3'
        >
          Explore more news
          <div className='flex items-center justify-center w-5 h-5'>
            <ArrowRightIcon className='stroke-white' />
          </div>
        </Link>
      </div>
    </section>
  );
};
