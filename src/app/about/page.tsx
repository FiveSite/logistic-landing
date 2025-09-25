'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { fetchTeam } from '@/services/api';
import { Team } from '@/types';
import { SupportForm } from '../components/form/SupportForm';

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<Team[]>([]);

  const swiperRef = useRef<SwiperType | null>(null);

  const getData = async () => {
    const data = await fetchTeam();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section>
        <div
          className='bg-cover bg-no-repeat h-[250px]'
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(246,246,246,0), rgba(255,255,255,0.8)), url('/images/about-bg.png')",
          }}
        ></div>
        <div className="px-[100px] bg-[url('/images/about-min.png')] bg-no-repeat ">
          <div className=' flex items-start px-[60px]'>
            <Image src='/images/about-caption.svg' alt='solution' width={193} height={82} className='' />
            <div className='flex flex-col gap-4 pt-[82px]'>
              <p>
                Our company was founded with a clear vision: to build a strong logistics bridge that connects Africa
                with the rest of the world. For too long, trade with and within Africa has faced challenges — from
                fragmented networks to complex customs processes and a lack of truly integrated solutions. We believe
                logistics should not be a barrier to growth but a powerful enabler of opportunity.
              </p>
              <p>
                Our company was founded with a clear vision: to build a strong logistics bridge that connects Africa
                with the rest of the world. For too long, trade with and within Africa has faced challenges — from
                fragmented networks to complex customs processes and a lack of truly integrated solutions. We believe
                logistics should not be a barrier to growth but a powerful enabler of opportunity.
              </p>
              <p>
                Our company was founded with a clear vision: to build a strong logistics bridge that connects Africa
                with the rest of the world. For too long, trade with and within Africa has faced challenges — from
                fragmented networks to complex customs processes and a lack of truly integrated solutions. We believe
                logistics should not be a barrier to growth but a powerful enabler of opportunity.
              </p>
              <p>
                Our company was founded with a clear vision: to build a strong logistics bridge that connects Africa
                with the rest of the world. For too long, trade with and within Africa has faced challenges — from
                fragmented networks to complex customs processes and a lack of truly integrated solutions. We believe
                logistics should not be a barrier to growth but a powerful enabler of opportunity.
              </p>
              <p>
                Our company was founded with a clear vision: to build a strong logistics bridge that connects Africa
                with the rest of the world. For too long, trade with and within Africa has faced challenges — from
                fragmented networks to complex customs processes and a lack of truly integrated solutions. We believe
                logistics should not be a barrier to growth but a powerful enabler of opportunity.
              </p>
            </div>
          </div>
          <section className='mx-auto py-[120px]'>
            <h2 className='flex justify-center gap-4 text-[40px] leading-[40px] font-bold mb-8'>
              <span className=''>Meat our</span>
              <span className='text-orange-600'>talented team</span>
            </h2>
            <p className='text-[16px] text-center mb-10'>
              Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit
              nullam neques.
            </p>

            <div className='max-md:px-3 relative w-full max-w-[1250px] block mx-auto'>
              <Swiper
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                spaceBetween={16}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                modules={[Navigation, Keyboard, Autoplay, Pagination]}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true,
                }}
                pagination={{
                  el: '.custom-swiper-pagination',
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className} custom-bullet"></span>`;
                  },
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
                {data.map((item) => (
                  <SwiperSlide
                    key={item.documentId}
                    className='max-w-[300px] md:max-w-[300px] flex justify-center group py-10'
                  >
                    <div className='cursor-pointer relative w-full  transition-all  hover:translate-y-[-12px]  duration-300 ease-in-out group-hover:shadow-xl rounded-[10px]'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.photo.url}`}
                        alt='Anna Roberts'
                        width={300}
                        height={400}
                        className='w-full h-auto object-cover md:w-[300px] md:h-[400px] rounded-[10px]'
                      />

                      <div className='absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl transition-shadow duration-300 ease-in-out group-hover:shadow-xl'>
                        <p className='font-semibold text-sm text-gray-900'>{item.name}</p>
                        <p className='text-xs text-gray-600'>{item.position}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Pagination here */}
              <div className='custom-swiper-pagination'></div>
            </div>
          </section>

          <div className='px-[60px] flex gap-15 pb-[60px] justify-center'>
            <SupportForm />
            <div className='space-y-6 text-sm text-gray-800 max-w-md py-8'>
              <div className='border-b pb-4 border-gray-200'>
                <h3 className='font-semibold text-[20px] text-black'>Chat to sales</h3>
                <p className='mt-4 text-[16px]'>Interested in smth? Speak to our friendly team.</p>
                <a href='mailto:business@company.com' className='block text-[16px] mt-2 font-semibold text-black'>
                  business@company.com
                </a>
              </div>

              <div className='border-b border-gray-200 pb-4'>
                <h3 className='font-semibold text-[20px] text-black'>Email support</h3>
                <p className='mt-4 text-[16px]'>Email us and we’ll get back to you within 24 hours.</p>
                <a href='mailto:support@company.com' className='block mt-2 text-[16px] font-semibold text-black'>
                  support@company.com
                </a>
              </div>

              <div>
                <h3 className='font-semibold text-[20px] text-black'>Chat support</h3>
                <p className='mt-4 text-[16px]'>Chat to our staff 24/7 for instant access to support.</p>
                <a href='mailto:chatting@company.com' className='block mt-2 text-[16px] font-semibold text-black'>
                  chatting@company.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
