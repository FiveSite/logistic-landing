import { Event } from '@/types';
import CalendarIcon from '../../../public/icons/calendar.svg';
import LocationIcon from '../../../public/icons/location.svg';
import { GoogleMapEmbed } from '../components/MapComponent';
import clsx from 'clsx';

interface EventProp {
  event: Event;
}

export const EventOverview = ({ event }: EventProp) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-6'>
        {' '}
        <div className='flex items-center gap-2'>
          <CalendarIcon className='w-4 h-4 stroke-orange-600' />
          {new Date(event.startDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        {event.endDate && (
          <div>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-0.5 bg-black mr-2'></span>
              {new Date(event.endDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        )}
      </div>

      <div className='text-[16px] flex items-center gap-2 mb-6'>
        <LocationIcon className='w-4 h-4 stroke-black' />
        {event.location}
      </div>

      {/* Карта */}

      <GoogleMapEmbed address={event.location} />

      {event.content &&
        event.content.map(({ title, body, id }, index, array) => (
          <div key={id} className={clsx(index === array.length - 1 ? 'mb-0' : 'mb-6')}>
            <h2 className='text-[30px] max-sm:text-[24px] leading-tight font-semibold] mb-6'>{title}</h2>
            <p className='text-[16px]'>{body}</p>
          </div>
        ))}
    </div>
  );
};
