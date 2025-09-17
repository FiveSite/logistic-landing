'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

export const Team = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className='pt-[160px] max-md:pt-20 w-full'>
      {/* <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mb-6' /> */}
      <div className='max-w-[1360px] mx-auto max-md:px-4 md:px-10'>
        <h2 className='text-3xl font-bold text-[#1D1D1F] mb-4 text-left max-md:text-center'>Meet our talented team</h2>

        <p className='text-[#1A1A1A] mb-10 text-left max-w-[600px] max-md:text-center'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <div className='max-md:px-3 px-10 relative w-full  max-w-[1360px] block mx-auto'>
        {/* Navigation Buttons */}
        <div className='absolute top-[-70px] right-10 z-10 flex gap-2 max-md:hidden'>
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
        </div>

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
            0: {
              slidesPerView: 1,
              centeredSlides: true,
              // slidesOffsetBefore: 12,
              // slidesOffsetAfter: 12,
            },
            // До 425px включно показуємо 1 центрований слайд
            376: {
              slidesPerView: 'auto',
              centeredSlides: false,
            },
            // Для екранів від 1440px і вище
            1440: {
              slidesPerView: 'auto',
              centeredSlides: false,
            },
          }}
          className=''
        >
          <SwiperSlide className='max-w-[400px] md:max-w-[333px] flex justify-center '>
            <Image
              src='/images/member2.png'
              alt='card1'
              width={400}
              height={421}
              className='md:w-[333px] md:h-[409px]'
            />
          </SwiperSlide>
          <SwiperSlide className='max-w-[400px] md:max-w-[333px] '>
            <Image
              src='/images/member2.png'
              alt='card1'
              width={400}
              height={421}
              className='md:w-[333px] md:h-[409px] '
            />
          </SwiperSlide>
          <SwiperSlide className='max-w-[400px] md:max-w-[333px] '>
            <Image
              src='/images/member2.png'
              alt='card1'
              width={400}
              height={421}
              className='md:w-[333px] md:h-[409px]'
            />
          </SwiperSlide>
          <SwiperSlide className='max-w-[400px] md:max-w-[333px] '>
            <Image
              src='/images/member1.png'
              alt='card1'
              width={400}
              height={421}
              className='md:w-[333px] md:h-[409px]'
            />
          </SwiperSlide>
          <SwiperSlide className='max-w-[400px] md:max-w-[333px] '>
            <Image
              src='/images/member2.png'
              alt='card1'
              width={400}
              height={421}
              className='md:w-[333px] md:h-[409px]'
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
