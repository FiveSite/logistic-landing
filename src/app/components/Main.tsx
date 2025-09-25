import Image from 'next/image';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';

export const Main = () => {
  return (
    <section className="bg-[url('/images/main-bg.png')] bg-cover bg-no-repeat ">
      <div className='xl:px-[420px] pt-[360px] max-md:pt-[100px] max-md:px-8'>
        <h1 className='text-[62px] max-md:text-[36px] font-bold text-[#1A1A1A] text-center leading-[62px] max-md:leading-[36px] mb-8 max-md:mb-6'>
          Translink Africa Logistics Network
        </h1>
        <p className='text-[18px] max-md:text-[16px] text-[#1A1A1A] text-center mb-12'>
          Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam
          neques.
        </p>

        <div className='relative flex justify-center gap-6 md:px-4 w-full mb-[100px] max-md:mb-10'>
          <button className=' border border-[#E1E4ED] hover:bg-gray-50 shadow-xs cursor-pointer flex items-center gap-2   text-[16px] bg-white px-8 py-3.5 rounded-[100px] transition-all ease-in  duration-300 '>
            About us
            {/* <div className='flex items-center justify-center w-5 h-5'>
              <ArrowRightIcon className='stroke-white' />
            </div> */}
          </button>

          <button className=' cursor-pointer flex items-center gap-2 shadow-xs text-white text-[16px] bg-orange-600 hover:bg-orange-700 px-8 py-3.5 rounded-[100px] transition-all ease-in  duration-300 '>
            Become a member
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
        </div>
      </div>

      <div className='w-full overflow-x-auto  max-md:px-4 px-10 '>
        <div className='relative flex justify-center max-lg:justify-start  gap-4 max-w-[1106px] mx-auto'>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item1.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item2.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item3.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item4.png' alt='cards' width={82} height={22} />
          </div>
          <div className='flex items-center justify-center px-8 max-lg:px-6 h-[74px] bg-white rounded-[20px] border border-[#F1F3F7] w-fit shrink-0'>
            <Image src='/images/item5.png' alt='cards' width={82} height={22} />
          </div>

          <div className='absolute max-lg:hidden left-0 right-0 bottom-0 top-0 h-[74px] bg-gradient-to-r from-[#F6F6F6] via-[#F6F6F6]/0 to-[#F6F6F6]'></div>
        </div>
      </div>
    </section>
  );
};
