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
            <div className='flex flex-col gap-7 pt-[82px]'>
              <p className='text-[16px] indent-4 font-[500]'>
                African Alliance Network is a premier logistics network dedicated to connecting vetted African freight
                forwarders with trusted global logistics partners. We empower our members to unlock the vast potential
                of Africa’s rapidly growing markets by providing seamless, reliable, and transparent logistics solutions
                tailored to their clients’ needs.
              </p>
              <p className='text-[16px] font-[500]'>
                At African Alliance, collaboration is at the heart of what we do. Our members work hand in hand,
                safeguarding each other’s business interests and building long-term partnerships rooted in trust and
                professionalism. Beyond logistics, we are committed to creating a secure and dependable global
                environment that our members can rely on—enabling them to deliver customized, end-to-end solutions
                across Africa and beyond.
              </p>
              <p className='text-[16px] font-[500]'>
                Backed by a{' '}
                <span className='text-orange-600'>
                  leadership team with over 25 years of experience in logistics for large multinationals
                </span>
                , the African Alliance Network is built on a deep understanding of the complexities of the African
                trade. Having always been based in and focused on Africa, our management brings first-hand expertise,
                local knowledge, and global perspective to every partnership.
              </p>
              <p className='text-[16px] font-[500]'>
                By uniting global reach with African trust, we break down barriers, strengthen trade connections, a nd
                open up boundless opportunities for freight forwarders and logistics companies worldwide. Join us in
                shaping the future of logistics in Africa and driving growth on a truly global scale.
              </p>
            </div>
          </div>

          {/* <section className='px-4 py-16 max-w-6xl mx-auto space-y-12'> */}

          <div className='px-[60px] pt-[100px] pb-[100px] mx-auto'>
            <div className='bg-[#F7F7F7] rounded-[24px] h-full  overflow-hidden flex flex-col md:flex-row items-center mb-8'>
              {/* Image */}
              <div className='w-[475px] relative h-[500px] '>
                <Image
                  src='/images/img-1.png'
                  alt='img'
                  width={475}
                  height={599}
                  className='object-cover h-full w-full rounded-l-[24px]'
                  priority
                />
              </div>

              {/* Content */}
              <div className='md:w-1/2 w-full p-6 md:p-10 text-left space-y-4'>
                <h3 className='text-[34px] leading-[1] mb-8 font-semibold'>Financial Protection & Assurance</h3>
                <p className='text-[16px] leading-relaxed'>
                  At African Alliance, we ensure that our valued partners conduct business with maximum security and
                  confidence. To safeguard our network, we provide financial protection protocols that help minimize
                  potential losses arising from transactions with qualified{' '}
                  <span className='text-orange-600'>Active Paid Members</span>. This assurance allows our members to
                  focus on growing their business with peace of mind.
                </p>
                <div className='flex items-start gap-2'>
                  <div>
                    <Image src={'/images/sign.png'} alt='img' width={100} height={100} />
                  </div>
                  <p className='text-[16px] leading-relaxed italic font-semibold'>
                    In addition, African Alliance has established its own dedicated{' '}
                    <span className='text-orange-600'>Financial Protection Fund</span>, covering claims of up to{' '}
                    <span className='text-orange-600'>USD 100,000</span>. Unlike traditional insurance-based schemes,
                    this fund is fully managed by African Alliance to give members greater trust and reassurance. It
                    reflects our team’s commitment to transparency, accountability, and providing genuine peace of mind
                    when working with fellow members within the network.
                  </p>
                </div>
              </div>
            </div>
            {/* 2 */}

            <div className='bg-[#F7F7F7] rounded-[24px]  overflow-hidden flex flex-col md:flex-row items-center justify-end mb-8'>
              {/* Content */}
              <div className='md:w-1/2 w-full p-6 md:p-10 text-left space-y-4'>
                <h3 className='text-[34px] leading-[1] mb-8 font-semibold'>Strict Membership Standards</h3>
                <p className='text-[16px] leading-relaxed mb-5'>
                  Every member undergoes a strict enrolment and compliance process, supported by our experienced
                  administration and compliance teams. Each application is carefully reviewed, with thorough financial,
                  managerial, and reputational checks conducted before granting membership. Only those who meet our
                  standards are recognized as <span className='text-orange-600'>Active Paid Members</span> of the
                  African Alliance Network.
                </p>
              </div>

              {/* Image */}
              <div className='w-[475px] relative h-[320px] '>
                <Image
                  src='/images/img-3.png'
                  alt='img'
                  width={475}
                  height={599}
                  className='object-cover h-full w-full rounded-r-[24px]'
                  priority
                />
              </div>
            </div>

            {/* 3 */}
            <div className='bg-[#F7F7F7] rounded-[24px]  overflow-hidden flex flex-col md:flex-row items-center'>
              {/* Image */}
              <div className='w-[475px] relative h-[370px] '>
                <Image
                  src='/images/img-2.png'
                  alt='img'
                  width={475}
                  height={599}
                  className='object-cover h-full w-full rounded-l-[24px]'
                  priority
                />
              </div>

              {/* Content */}
              <div className='md:w-1/2 w-full p-6 md:p-10 text-left space-y-4'>
                <h3 className='text-[34px] leading-[1] mb-8 font-semibold'>Ongoing Risk Management</h3>
                <p className='text-[16px] leading-relaxed mb-5'>
                  To further strengthen financial security, African Alliance regularly circulates warning alerts and
                  blacklist details across the network. These proactive measures help raise awareness, mitigate risks,
                  and foster a culture of trust and responsibility among members.
                </p>
                <p className='text-[16px] leading-relaxed'>
                  Through this strong framework of compliance, monitoring, and protection, African Alliance ensures a
                  reliable and transparent environment where freight forwarders and logistics companies can confidently
                  build long-term partnerships.
                </p>
              </div>
            </div>
          </div>

          <div className='px-[60px] flex gap-20  pb-[60px] justify-center'>
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
