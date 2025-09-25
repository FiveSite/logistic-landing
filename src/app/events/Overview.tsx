import { Event } from '@/types';
import CalendarIcon from '../../../public/icons/calendar.svg';
import LocationIcon from '../../../public/icons/location.svg';

interface EventProp {
  event: Event;
}

export const EventOverview = ({ event }: EventProp) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <CalendarIcon className='w-4 h-4 stroke-orange-600' />
        {new Date(event.startDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
      {event.endDate && (
        <>
          <span>—</span>
          <div className='flex items-center gap-2'>
            {new Date(event.endDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </>
      )}

      <div className='text-[16px] flex items-center gap-2 mb-6'>
        <LocationIcon className='w-4 h-4 stroke-black' />
        {event.location}
      </div>

      {/* Карта */}
      <div className='w-full h-[300px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999481683301!2d2.292292615674213!3d48.8588444792878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdd1f9f5e07%3A0xc80b8f06e177fe62!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1639076231074!5m2!1sen!2sfr'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>

      {event.content &&
        event.content.map(({ title, body, id }) => (
          <div key={id} className='mb-6'>
            <h2 className='text-[30px] font-semibold mb-6'>{title}</h2>
            <p className='text-[16px]'>{body}</p>
          </div>
        ))}
    </div>
  );
};
