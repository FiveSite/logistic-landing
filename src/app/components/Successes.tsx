import Image from 'next/image';

export const Successes = () => {
  return (
    <section className=''>
      <div className='px-4'>
        <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />
        <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Numbers that showcase our success</h2>
        <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] mb-10'>
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
        <div className='bg-white rounded-xl shadow-[0_24px_24px_rgba(0,0,0,0.04)] px-20 max-xl:px-12 py-12 w-full max-w-[316px] h-[242px] flex flex-col items-center justify-center'>
          <div className='text-[40px] sm:text-[50px] font-semibold'>200+</div>
          <div className='text-[16px] font-semibold text-center whitespace-nowrap'>Websites build</div>
        </div>

        <div className='bg-white rounded-xl shadow-[0_24px_24px_rgba(0,0,0,0.04)] px-20 max-xl:px-12 py-12 w-full max-w-[316px] h-[242px] flex flex-col items-center justify-center'>
          <div className='text-[40px] sm:text-[50px] font-semibold'>97%</div>
          <div className='text-[16px] font-semibold text-center whitespace-nowrap'>Client satisfaction</div>
        </div>

        <div className='bg-white rounded-xl shadow-[0_24px_24px_rgba(0,0,0,0.04)] px-20 max-xl:px-12 py-12 w-full max-w-[316px] h-[242px] flex flex-col items-center justify-center'>
          <div className='text-[40px] sm:text-[50px] font-semibold'>34+</div>
          <div className='text-[16px] font-semibold text-center whitespace-nowrap'>Team members</div>
        </div>

        <div className='bg-white rounded-xl  px-20 max-xl:px-12 py-12 w-full max-w-[316px] h-[242px] flex flex-col items-center justify-center shadow-[0_24px_24px_rgba(0,0,0,0.04)]'>
          <div className='text-[40px] sm:text-[50px] font-semibold'>100+</div>
          <div className='text-[16px] font-semibold text-center whitespace-nowrap'>Amazing clients</div>
        </div>
      </div>
    </section>

    // <section className=''>
    //   <Image src='/images/caption.svg' alt='solution' width={118} height={32} className='mx-auto mb-6' />

    //   <h2 className='text-center text-3xl font-bold text-[#1D1D1F] mb-4'>Numbers that showcase our success</h2>

    //   <p className='text-center max-w-[600px] mx-auto text-[#1A1A1A] mb-10'>
    //     Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
    //   </p>
    //   <div className='grid grid-cols-1  md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8'>
    //     <div className='bg-white rounded-xl shadow px-6 py-20 w-[316px] h-[242px] flex flex-col items-center justify-center'>
    //       <div className='text-[50px] font-semibold '>200+</div>
    //       <div className='text-[16px] font-semibold  whitespace-nowrap'>Websites build</div>
    //     </div>

    //     <div className='bg-white rounded-xl shadow px-6 py-20 w-[316px] h-[242px] flex flex-col items-center justify-center'>
    //       <div className='text-[50px] font-semibold '>97%</div>
    //       <div className='text-[16px] font-semibold  whitespace-nowrap'>Client satisfaction</div>
    //     </div>

    //     <div className='bg-white rounded-xl shadow px-6 py-20 w-[316px] h-[242px] flex flex-col items-center justify-center'>
    //       <div className='text-[50px] font-semibold '>34+</div>
    //       <div className='text-[16px] font-semibold  whitespace-nowrap'>Team members</div>
    //     </div>

    //     <div className='bg-white rounded-xl shadow px-6 py-20 w-[316px] h-[242px] flex flex-col items-center justify-center'>
    //       <div className='text-[50px] font-semibold '>100+</div>
    //       <div className='text-[16px] font-semibold  whitespace-nowrap'>Amazing clients</div>
    //     </div>
    //   </div>
    // </section>
  );
};
