'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useRef, useState, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import CalendarIcon from '../../../public/icons/calendar.svg';
import { Event } from '@/types';
import { fetchEvents } from '@/services/api';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import LocationIcon from '../../../public/icons/location.svg';
import Link from 'next/link';

export const ArticlesEventsSection = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [data, setData] = useState<Event[]>([]);

  const getData = async () => {
    try {
      const data = await fetchEvents();
      setData(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className=' max-md:pt-20 w-full'>
      {/* <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mb-6' /> */}
      <div className='max-w-[1360px] mx-auto max-md:px-4'>
        <div className='flex items-center justify-between mb-10'>
          <h2 className='text-3xl font-bold text-[#1D1D1F] mb-4 text-left max-md:text-center'>Latest events</h2>
          <Link
            href='/events'
            className='cursor-pointer flex items-center gap-2 w-fit text-[16px] rounded-[100px]  font-semibold text-white bg-orange-600 hover:bg-orange-700 px-4 py-3'
          >
            Explore more events
            <div className='flex items-center justify-center w-5 h-5'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </Link>
        </div>
        {/* <p className='text-[#1A1A1A] mb-10 text-left max-w-[600px] max-md:text-center'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p> */}
      </div>
      <div className='max-md:px-3 relative w-full  max-w-[1360px] block mx-auto'>
        {/* Navigation Buttons */}
        {/* <div className='absolute top-[-70px] right-10 z-10 flex gap-2 max-md:hidden'>
          <button
            ref={prevRef}
            className='w-10 h-10 rounded-[8px] bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-gray-100 transition'
          >
            ←
          </button>
          <button
            ref={nextRef}
            className='w-10 h-10 rounded-[8px] bg-orange-600 flex items-center justify-center text-white hover:bg-orange-600 transition'
          >
            →
          </button>
        </div> */}

        <Swiper
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={16}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Navigation, Keyboard, Autoplay]}
          onBeforeInit={(swiper) => {
            // Прив'язка кнопок до swiper
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
            delay: 2000, // ⏱ час між слайдами (мс)
            disableOnInteraction: false, // не зупиняти при свайпі
          }}
          speed={2000} // ⏱ час між слайдами (мс)
          breakpoints={{
            // 0: {
            //   slidesPerView: 1,
            //   centeredSlides: true,
            //   // slidesOffsetBefore: 12,
            //   // slidesOffsetAfter: 12,
            // },
            // До 425px включно показуємо 1 центрований слайд
            // 376: {
            //   slidesPerView: 'auto',
            //   centeredSlides: false,
            // },
            // Для екранів від 1440px і вище
            1280: {
              slidesPerView: 2,
              centeredSlides: false,
            },
          }}
          className=''
        >
          {data.map((item: Event, index: number) => (
            <SwiperSlide key={index} className=''>
              <div className='flex flex-col'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.photo.url}`}
                  alt='solution'
                  width={544}
                  height={553}
                  className='mb-6'
                />

                <div className='text-[16px] flex items-center gap-2 mb-5'>
                  <div className='flex items-center gap-2'>
                    <CalendarIcon className='w-4 h-4 stroke-orange-600' />
                    {new Date(item.startDate).toLocaleDateString()}
                  </div>
                  {item.endDate && (
                    <>
                      <span>—</span>
                      <div className='flex items-center gap-2'>{new Date(item.endDate).toLocaleDateString()}</div>
                    </>
                  )}
                </div>
                <div className='text-[16px] flex items-center gap-2 mb-5'>
                  <LocationIcon className='w-4 h-4 stroke-black' />
                  {item.location}
                </div>
                <h1 className='text-[30px] leading-[30px] font-semibold mb-6'>{item.title}</h1>
                <p className='text-[16px]'>{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
