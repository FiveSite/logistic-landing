'use client';

import Image from 'next/image';
import LocationIcon from '../../../public/icons/location.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import ArrowRightIcon from '../../../public/icons/arrow-right.svg';
import Link from 'next/link';
import { Media } from '@/types';

type NewEventProps = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;

  photo?: Media | null;
  documentId: string;
};

const EventCard = ({ title, description, startDate, endDate, location, photo, documentId }: NewEventProps) => {
  return (
    <div className='flex gap-6.5  max-lg:gap-0 items-center  max-lg:flex-col max-w-[343px] sm:max-w-[585px] lg:max-w-full'>
      <Link
        href={`/events/${documentId}`}
        className='sm:max-w-[585px] bg-gray-100 flex items-center justify-center rounded-[8px]  max-lg:rounded-b-none shrink-0'
      >
        {photo ? (
          <Image
            src={photo?.url ?? ''}
            alt={title}
            width={585}
            height={343}
            className='object-cover w-full h-full max-sm:w-[343px] sm:w-[585px] max-sm:h-[354px] rounded-[8px] max-lg:rounded-b-none'
          />
        ) : (
          <div className='text-gray-400 text-xl'>🖼️</div>
        )}
      </Link>

      <div className='flex flex-col max-lg:bg-white max-lg:p-4 rounded-b-[8px]'>
        <Link
          href={`/events/${documentId}`}
          className='text-[30px] leading-none max-sm:text-[24px222222] font-semibold mb-6 hover:underline'
        >
          {title}
        </Link>
        <div className='text-[16px] flex items-center gap-2 mb-6'>
          <div className='flex items-center gap-2'>
            <CalendarIcon className='w-4 h-4 stroke-orange-600' />
            {new Date(startDate).toLocaleDateString()}
          </div>
          {endDate && (
            <>
              <span>—</span>
              <div className='flex items-center gap-2'>{new Date(endDate).toLocaleDateString()}</div>
            </>
          )}
        </div>
        <div className='text-[16px] flex items-center gap-2 mb-6'>
          <LocationIcon className='w-4 h-4 stroke-black' />
          {location}
        </div>
        <p className=' text-[16px] leading-relaxed line-clamp-3 mb-6'>{description}</p>

        <button className='max-lg:w-full max-lg:justify-center cursor-pointer flex items-center gap-2 w-fit text-[16px] rounded-[100px]  font-semibold text-white bg-orange-600 hover:bg-orange-700 px-4 py-2'>
          Register now
          <div className='flex items-center justify-center w-5 h-5'>
            <ArrowRightIcon className='stroke-white' />
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
