import Image from 'next/image';

export const Main = () => {
  return (
    <section className="bg-[url('/images/main-bg.png')] bg-cover bg-no-repeat ">
      <div className='xl:px-[420px] pt-[200px] max-md:pt-[100px] max-md:px-8'>
        <h1 className='text-[62px] max-md:text-[36px] font-bold text-[#1A1A1A] text-center leading-[62px] max-md:leading-[36px] mb-8 max-md:mb-6'>
          Discover the key to grow your business
        </h1>
        <p className='text-[18px] max-md:text-[16px] text-[#1A1A1A] text-center mb-12'>
          Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit phasellus mollis sit aliquam sit nullam
          neques.
        </p>

        <div className='relative flex items-center md:px-4 w-full mb-[100px] max-md:mb-10'>
          <Image
            src='/icons/search.svg'
            alt='search'
            width={16}
            height={16}
            className='absolute left-8 max-md:left-4'
          />
          <input
            type='text'
            placeholder='Search by...'
            className='w-full  h-[56px] pl-8 pr-2 py-2 bg-white rounded-[100px] border border-[#F1F3F7] focus:outline-none text-sm text-[#1A1A1A] placeholder-[#1A1A1A] ml-2'
          />
          <button className='absolute right-8 max-md:right-4 px-4 py-[9px] flex gap-2 items-center bg-orange-600 text-white rounded-[100px] text-[14px]'>
            Company name
            {/* <Image src='/icons/chevron-down.svg' alt='arrow-down' width={16} height={16} className='inline ml-2' /> */}
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
