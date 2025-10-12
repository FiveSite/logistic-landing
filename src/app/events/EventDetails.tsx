'use client';

import { Event } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { EventOverview } from './Overview';
import { ArticlesEventsSection } from './ArticlesEventsSection';

interface EventProp {
  event: Event;
}

const tabs = ['Overview', 'Schedule', 'Speakers', 'Registration'];

const EventDetails = ({ event }: EventProp) => {
  const useCountdown = (targetDate: string | Date) => {
    const countDownDate = new Date(targetDate).getTime();

    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

    function getTimeLeft() {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      };
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft());
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return timeLeft;
  };

  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = (tab: string) => {
    switch (tab) {
      case 'Overview':
        return <EventOverview event={event} />;
      case 'Schedule':
        return <div>Schedule</div>;
      case 'Speakers':
        return <div>Speakers</div>;
      case 'Registration':
        return <div>Registration</div>;
      default:
        return null;
    }
  };

  const { days, hours, minutes, seconds } = useCountdown(event.startDate);

  return (
    <div>
      <div className=''>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${event.photo.url}`}
          alt='Event banner'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full max-h-[700px] object-cover rounded-lg '
          priority
        />
        <div className='absolute top-[417px] mx-auto left-0 right-0'>
          <h2 className='text-center font-bold text-white text-[62px] leading-[62px] mb-6'>{event.title}</h2>
          <p className='text-white text-center text-[20px]'>{event.description}</p>
        </div>
      </div>

      {/* Countdown Timer */}

      <div className='mx-auto left-0 right-0 absolute grid grid-cols-4 top-[580px] w-7xl h-[223px] bg-white shadow-[0_24px_24px_rgba(0,0,0,0.04)] rounded-[20px]  text-center text-orange-600 font-bold text-xl'>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>{String(days).padStart(2, '0')}</div>
          <div>Days</div>
        </div>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>{String(hours).padStart(2, '0')}</div>
          <div>Hours</div>
        </div>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>{String(minutes).padStart(2, '0')}</div>
          <div>Minutes</div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-4xl'>{String(seconds).padStart(2, '0')}</div>
          <div>Seconds</div>
        </div>
      </div>

      {/* <div className='mx-auto left-0 right-0 absolute grid grid-cols-4 top-[580px] w-7xl h-[223px] bg-white shadow-[0_24px_24px_rgba(0,0,0,0.04)] rounded-[20px]  text-center text-orange-600 font-bold text-xl'>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>69</div>
          <div>Days</div>
        </div>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>06</div>
          <div>Hours</div>
        </div>
        <div className='flex flex-col justify-center items-center border-r-2 border-gray-100'>
          <div className='text-4xl'>13</div>
          <div>Minutes</div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-4xl'>21</div>
          <div>Seconds</div>
        </div>
      </div> */}

      <div className='px-[166px] max-w-7xl mx-auto pt-[160px] pb-[60px]'>
        {/* Таби */}
        <div className='flex justify-center mb-15 rounded-[100px]'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                activeTab === tab && 'bg-orange-600 text-white rounded-[100px]',
                'cursor-pointer h-[36px] py-2 px-4 text-[16px] w-[274px] font-medium border-b-2 border-transparent '
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent(activeTab)}
        <ArticlesEventsSection />
      </div>
    </div>
  );
};
export default EventDetails;
