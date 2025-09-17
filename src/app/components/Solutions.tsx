import Image from 'next/image';

export const Solutions = () => {
  return (
    <section className='relative w-full py-[90px] max-md:pt[80px] pb-[160px] max-md:pb-[100px] px-4 md:px-10 bg-[#F6F6F6] overflow-hidden'>
      <img
        src='/images/solution-bg.png'
        alt='background decoration'
        className='absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none'
      />

      <div className='relative z-10 max-md:px-7 backdrop-blur-[20px] bg-white/50 border border-black/5 shadow-[0_24px_24px_rgba(0,0,0,0.04)] w-fit rounded-[32px]  mx-auto xl:p-20 lg:p-12 max-md:py-8 p-20'>
        <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

        <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Highly effective solutions</h2>

        <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] mb-10'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>

        <div className='flex flex-col xl:flex-row items-center justify-center gap-20'>
          <div className='relative lg:w-[560px] max-lg:w-[290px] h-auto flex-shrink-0 max-md:mx-auto'>
            {/* Основне зображення */}
            <Image
              src='/images/Rectangle12.png'
              alt='Main image'
              width={560}
              height={420}
              className='rounded-xl w-full object-cover max-lg:w-[290px] max-lg:h-[220px]'
            />

            {/* Верхнє зображення (ліворуч) */}
            <Image
              src='/images/Rectangle14.png'
              alt='Truck top'
              width={153}
              height={115}
              className='absolute top-[-40px] left-[-30px] rounded-lg shadow-lg 
               max-lg:w-[117px] max-md:top-[-30px] max-md:left-[-20px]'
            />

            {/* Нижнє зображення (праворуч) */}
            <Image
              src='/images/Rectangle13.png'
              alt='Truck bottom'
              width={153}
              height={115}
              className='absolute bottom-[-30px] right-[-20px] rounded-lg shadow-lg 
               max-lg:w-[80px] max-md:bottom-[-20px] max-md:left-[225px]'
            />
          </div>

          {/* <div className='relative w-full md:w-[380px] h-auto flex-shrink-0 max-md:mx-auto'>
            <Image
              src='/images/Rectangle12.png'
              alt='Main image'
              width={560}
              height={420}
              className='rounded-xl w-full object-cover max-md:w-[300px] max-md:h-[220px]'
            />

            <Image
              src='/images/Rectangle14.png'
              alt='Truck top'
              width={225}
              height={170}
              className='absolute top-[-40px] left-[-30px] w-[120px] rounded-lg shadow-lg'
            />

            <Image
              src='/images/Rectangle13.png'
              alt='Truck bottom'
              width={153}
              height={115}
              className='absolute bottom-[-30px] right-[-20px] w-[100px] rounded-lg shadow-lg'
            />
          </div> */}

          <div className='grid grid-cols-2 gap-x-6 gap-y-[64px] w-full md:w-[400px]'>
            <div className='flex flex-col max-md:items-center gap-4'>
              <Image src='/images/sol.svg' alt='check' width={75} height={48} />
              <div>
                <p className='text-[14px] text-[#1A1A1A]  '>Lorem Ipsum is simply dummy text of the printing...</p>
              </div>
            </div>
            <div className='flex flex-col max-md:items-center gap-4'>
              <Image src='/images/sol1.svg' alt='check' width={50} height={48} />
              <div>
                <p className='text-[14px] text-[#1A1A1A]  '>Lorem Ipsum is simply dummy text of the printing...</p>
              </div>
            </div>
            <div className='flex flex-col max-md:items-center gap-4'>
              <Image src='/images/sol2.svg' alt='check' width={57} height={48} />
              <div>
                <p className='text-[14px] text-[#1A1A1A]  '>Lorem Ipsum is simply dummy text of the printing...</p>
              </div>
            </div>
            <div className='flex flex-col max-md:items-center gap-4'>
              <Image src='/images/sol3.svg' alt='check' width={48} height={48} />
              <div>
                <p className='text-[14px] text-[#1A1A1A]  '>Lorem Ipsum is simply dummy text of the printing...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
