import ArrowRightIcon from '../../../public/icons/arrow-right.svg';

export const PhotoSection = () => {
  return (
    <section className='bg-[#F6F6F6] px-10 w-full pt-[120px]'>
      <div
        className='relative h-[400px] w-full bg-no-repeat bg-cover bg-center rounded-[20px] overflow-hidden'
        style={{
          backgroundImage: "url('/images/lorry-bg.png')",
        }}
      >
        {/* Темний градієнт на частину блоку */}
        <div className="absolute top-0 left-0 h-full w-[600px] bg-[url('/images/gradient-dark.png')] bg-cover bg-no-repeat bg-left z-10 rounded-l-[20px]" />

        {/* Текст — поверх усього */}
        <div className='absolute top-25 left-0 h-full w-full z-20 flex flex-col justify-start px-20'>
          <h2 className='text-white text-[34px] leading-[34px] font-semibold max-w-[500px] mb-6'>
            Move Your Business Forward With Logistics You Can Trust
          </h2>
          <p className='text-white text-[16px] max-w-[500px] mb-8'>
            Fast, reliable, and transparent delivery solutions tailored to your needs. From warehouse to destination, we
            make every mile count.
          </p>
          <button className='text-white text-[16px] font-semibold bg-orange-600 hover:bg-orange-700 w-fit rounded-[100px] cursor-pointer flex items-center gap-2 px-10 py-3'>
            Join us
            <div className='flex items-center justify-center w-4 h-4'>
              <ArrowRightIcon className='stroke-white' />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
