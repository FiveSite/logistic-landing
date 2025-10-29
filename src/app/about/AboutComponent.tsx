import Image from 'next/image';
import { SupportForm } from '../components/form/SupportForm';
import { Benefit } from '@/types';

interface ContactData {
  email: string;
  title: string;
  aftertitle: string;
  id: number;
}

export const AboutComponent = ({
  contactData,
  aboutData,
  benefits,
}: {
  contactData: ContactData[];
  aboutData: {
    id: number;
    description: string;
  };
  benefits: Benefit[];
}) => {
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

            <div className='lg:pt-[90px] pt-8' dangerouslySetInnerHTML={{ __html: aboutData.description }} />
          </div>

          <div className='max-sm:px-0 px-4 pt-[80px] pb-[80px] sm:px-6 md:px-10 xl:px-[60px] max-w-7xl mx-auto space-y-10'>
            {/* block1*/}
            <div
              id='financial-protection'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:grid xl:grid-cols-2 items-center '
            >
              <div className='w-full  relative h-[300px] sm:h-[400px] xl:h-full'>
                <Image
                  src={benefits[2]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px] xl:rounded-l-[24px] xl:rounded-tr-none '
                  priority
                />
              </div>

              <div className='w-full xl:h-full  p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  {benefits[2]?.title}
                </h3>

                <div className='' dangerouslySetInnerHTML={{ __html: benefits[2]?.text }} />
              </div>
            </div>

            {/* block2*/}
            <div
              id='risk-management'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:grid xl:grid-cols-2 items-center '
            >
              <div className='w-full  relative h-[300px] sm:h-[400px] xl:h-full order-1 xl:order-2'>
                <Image
                  src={benefits[0]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px]  xl:rounded-l-none '
                  priority
                />
              </div>

              <div className='w-full xl:h-full  p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1 order-2 xl:order-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  {benefits[0]?.title}
                </h3>

                <div className='' dangerouslySetInnerHTML={{ __html: benefits[0]?.text }} />
              </div>
            </div>

            {/* blok3 */}
            <div
              id='membership-standards'
              className='bg-[#F7F7F7] rounded-[24px] overflow-hidden flex flex-col xl:grid xl:grid-cols-2 items-center '
            >
              <div className='w-full  relative h-[300px] sm:h-[400px] xl:h-full'>
                <Image
                  src={benefits[1]?.photo?.url || ''}
                  alt='img'
                  fill
                  className='object-cover w-full h-full rounded-t-[24px] xl:rounded-l-[24px] xl:rounded-tr-none '
                  priority
                />
              </div>

              <div className='w-full xl:h-full  p-4 sm:p-6 md:p-10 space-y-4 text-left flex-1'>
                <h3 className='text-[24px] sm:text-[28px] md:text-[34px] leading-[1] font-semibold mb-4 md:mb-8'>
                  {benefits[1]?.title}
                </h3>

                <div className='' dangerouslySetInnerHTML={{ __html: benefits[1]?.text }} />
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
