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

    const getTimeLeft = () => {
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
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft());
      }, 1000);
      return () => clearInterval(interval);
    }, [countDownDate]);

    return timeLeft;
  };

  const [activeTab, setActiveTab] = useState('Overview');
  const { days, hours, minutes, seconds } = useCountdown(event.startDate);

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

  return (
    <div className='relative'>
      <div className='relative'>
        <Image
          src={event.photo?.url ?? ''}
          alt='Event banner'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-[700px] max-lg:h-[500px] max-md:h-[350px] object-cover rounded-lg'
          priority
        />

        <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
          <h2 className='text-white font-bold text-[48px] sm:text-[36px] max-sm:text-[24px] leading-tight mb-4 drop-shadow-md'>
            {event.title}
          </h2>
          <p className='text-white text-[18px] max-sm:text-[14px] max-w-2xl'>{event.description}</p>
        </div>
      </div>

      <div className='relative -mt-16 sm:-mt-12 mx-auto w-[90%] max-w-5xl bg-white shadow-[0_24px_24px_rgba(0,0,0,0.04)] rounded-[20px] grid grid-cols-4  gap-y-4 text-center text-orange-600 font-bold text-xl py-8'>
        {[
          { label: 'Days', value: days },
          { label: 'Hours', value: hours },
          { label: 'Minutes', value: minutes },
          { label: 'Seconds', value: seconds },
        ].map((item, idx) => (
          <div
            key={item.label}
            className={clsx(
              'flex flex-col justify-center items-center',
              idx < 3 && 'border-r-2 border-gray-100 max-sm:border-none'
            )}
          >
            <div className='text-4xl'>{String(item.value).padStart(2, '0')}</div>
            <div className='text-gray-600 text-base font-medium'>{item.label}</div>
          </div>
        ))}
      </div>

      <div className='px-[160px] max-xl:px-20 max-lg:px-10 max-md:px-4 max-w-7xl mx-auto pt-[100px] max-sm:pt-10 pb-[50px] max-lg:pb-10'>
        <div className='w-full overflow-x-auto scrollbar-hide mb-10'>
          <div className='flex justify-start gap-3 min-w-max px-4'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'whitespace-nowrap py-2 px-6 text-[16px] font-medium rounded-full border transition-colors duration-200',
                  activeTab === tab
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'border-gray-200 text-gray-600 hover:bg-orange-100'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {renderContent(activeTab)}
        <ArticlesEventsSection />
      </div>
    </div>
  );
};

export default EventDetails;
