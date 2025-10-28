'use client';
import Image from 'next/image';
import { SupportForm } from '../components/form/SupportForm';
import { useEffect, useState } from 'react';
import { Benefit } from '@/types';
import { fetchBenefits } from '@/services/api';

interface ContactData {
  email: string;
  title: string;
  aftertitle: string;
  id: number;
}

export const AboutComponent = ({ contactData }: { contactData: ContactData[] }) => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const getData = async () => {
    const data = await fetchBenefits();
    setBenefits(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section>
        <div
          className='bg-cover bg-no-repeat lg:h-[250px] h-[170px]'
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(246,246,246,0), rgba(255,255,255,0.8)), url('/images/about-bg.png')",
          }}
        ></div>
        <div className="sm:px-[100px] px-6 sm:bg-[url('/images/about-min.png')] bg-no-repeat ">
          <div className=' flex max-lg:flex-col items-center lg:items-start sm:px-[60px] px-0'>
            <Image src='/images/about-caption.svg' alt='solution' width={193} height={82} className='' />

            <div className='flex flex-col gap-7 lg:pt-[82px] pt-8'>
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

          <div className='max-sm:px-0 px-4 pt-[80px] pb-[80px] sm:px-6 md:px-10 xl:px-[60px] max-w-7xl mx-auto space-y-10'>
            {/* Block 1 - Financial Protection */}
            <div
              id='financial-protection'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:flex-row items-center'
            >
              {/* Image */}
              <div className='w-full xl:w-1/2 relative h-[300px] sm:h-[400px] xl:h-[600px]'>
                {/* <div className='w-full xl:w-1/2 relative h-[300px] sm:h-[400px] xl:h-full flex-1 items-stretch'> */}
                <Image
                  src={benefits[1]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px] xl:rounded-l-[24px] xl:rounded-tr-none'
                  priority
                />
              </div>

              {/* Content */}
              <div className='w-full xl:w-1/2 p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  Financial Protection & Assurance
                </h3>
                <p className='text-[14px] sm:text-[16px] leading-relaxed'>
                  At African Alliance, we ensure that our valued partners conduct business with maximum security and
                  confidence. To safeguard our network, we provide financial protection protocols that help minimize
                  potential losses arising from transactions with qualified{' '}
                  <span className='text-orange-600'>Active Paid Members</span>. This assurance allows our members to
                  focus on growing their business with peace of mind.
                </p>
                <div className='flex items-start gap-4'>
                  <Image src='/images/sign.png' alt='img' width={24} height={24} className='flex-shrink-0' />
                  <p className='text-[14px] sm:text-[16px] leading-relaxed italic font-semibold'>
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

            {/* Block 2 - Membership Standards */}
            <div
              id='membership-standards'
              // className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col md:flex-row-reverse items-center'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:flex-row-reverse items-center'
            >
              {/* Image */}
              <div className='w-full xl:w-1/2 relative h-[300px] sm:h-[400px] xl:h-[400px]'>
                <Image
                  src={benefits[0]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px] xl:rounded-l-none xl:rounded-tr-none'
                  priority
                />
              </div>

              {/* Content */}
              <div className='w-full xl:w-1/2 p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  Strict Membership Standards
                </h3>
                <p className='text-[14px] sm:text-[16px] leading-relaxed'>
                  Every member undergoes a strict enrolment and compliance process, supported by our experienced
                  administration and compliance teams. Each application is carefully reviewed, with thorough financial,
                  managerial, and reputational checks conducted before granting membership. Only those who meet our
                  standards are recognized as <span className='text-orange-600'>Active Paid Members</span> of the
                  African Alliance Network.
                </p>
              </div>
            </div>

            {/* Block 3 - Risk Management */}
            <div
              id='risk-management'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:flex-row items-center'
            >
              {/* Image */}
              <div className='w-full xl:w-1/2 relative h-[300px] sm:h-[400px] xl:h-[400px]'>
                <Image
                  src={benefits[2]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px] xl:rounded-l-[24px] xl:rounded-tr-none'
                  priority
                />
              </div>

              {/* Content */}
              <div className='w-full xl:w-1/2 p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  Ongoing Risk Management
                </h3>
                <p className='text-[14px] sm:text-[16px] leading-relaxed'>
                  To further strengthen financial security, African Alliance regularly circulates warning alerts and
                  blacklist details across the network. These proactive measures help raise awareness, mitigate risks,
                  and foster a culture of trust and responsibility among members.
                </p>
                <p className='text-[15px] sm:text-[16px] leading-relaxed'>
                  Through this strong framework of compliance, monitoring, and protection, African Alliance ensures a
                  reliable and transparent environment where freight forwarders and logistics companies can confidently
                  build long-term partnerships.
                </p>
              </div>
            </div>
          </div>

          <div
            id='contact-us'
            className='xl:px-[60px] flex max-lg:flex-col max-lg:items-center gap-20 max-lg:gap-2 pb-[60px] justify-center'
          >
            <SupportForm />
            <div className='space-y-6 text-sm text-gray-800 max-w-md py-8 max-lg:pb-5'>
              {contactData.map((item, index) => (
                <div key={index}>
                  <h3 className='font-semibold text-[20px] text-black'>{item.title}</h3>
                  <p className='mt-4 text-[16px]'>{item.aftertitle}</p>
                  <a href={`mailto:${item.email}`} className='block mt-2 text-[16px] font-semibold text-black'>
                    {item.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
