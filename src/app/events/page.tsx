import { fetchEvents } from '@/services/api';
import { EventsList } from './Events';

export default async function EventPage() {
  const events = await fetchEvents();
  return (
    <div className='bg-[#F6F6F6]'>
      <div className='xl:px-[160px] md:px-10 max-md:px-4 pb-[60px] mx-auto'>
        <div className='flex items-center justify-between pb-10 max-sm:flex-col max-sm:justify-center max-sm:gap-4 pt-[160px]'>
          <h1 className='text-[36px] leading-[36px] font-bold whitespace-nowrap'>Latest events</h1>
        </div>

        <div className='h-[1px] w-full bg-gray-200 max-sm:hidden'></div>

        <div className='sm:mt-10'>
          <EventsList events={events} />
        </div>
      </div>
    </div>
  );
}
