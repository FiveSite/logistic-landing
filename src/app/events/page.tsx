import { EventsList } from './Events';
import Link from 'next/link';

export default function EventPage() {
  return (
    <div className='bg-[#F6F6F6]'>
      <div className='xl:px-[160px] md:px-10 max-md:px-4 pb-[60px] mx-auto'>
        <div className='flex items-center justify-between pb-10 max-sm:flex-col max-sm:justify-center max-sm:gap-4 pt-[160px]'>
          <h1 className='text-[36px] leading-[36px] font-bold whitespace-nowrap'>Latest events</h1>

          <div className='flex'>
            <Link
              href='/news'
              className='text-[16px] font-semibold border border-gray-200 border-r-0 rounded-l-[24px] cursor-pointer flex items-center justify-center h-[36px] max-sm:w-[171px] w-[182px]'
            >
              News
            </Link>
            <button className='text-[16px] text-white bg-orange-600  font-semibold rounded-r-[24px] cursor-pointer flex items-center justify-center h-[36px] max-sm:w-[171px] w-[182px]'>
              Events
            </button>
          </div>
        </div>

        <div className='h-[1px] w-full bg-gray-200 max-sm:hidden'></div>

        <div className='sm:mt-10'>
          <EventsList />
        </div>
      </div>
    </div>
  );
}
