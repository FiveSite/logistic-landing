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
          className='w-full h-[700px] max-lg:h-[500px] max-md:h-[350px] object-cover lg:rounded-lg'
          priority
        />

        <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
          <h2 className='text-white font-bold text-[48px] sm:text-[36px] max-sm:text-[24px] leading-tight mb-4 drop-shadow-md'>
            {event.title}
          </h2>
          <p className='text-white text-[18px] max-sm:text-[14px] max-w-2xl'>{event.description}</p>
        </div>
      </div>

      <div className='relative -mt-12 sm:-mt-24 mx-auto w-[90%] max-w-6xl bg-white shadow-[0_24px_24px_rgba(0,0,0,0.04)] rounded-[20px] grid grid-cols-4  gap-y-4 text-center text-orange-600 font-bold text-xl lg:py-15  md:py-10 py-4'>
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

      <div className='px-[100px] max-xl:px-20 max-lg:px-10 max-md:px-4 max-w-7xl mx-auto pt-[100px] max-sm:pt-10 pb-[50px] max-lg:pb-10'>
        <div className='flex justify-center w-full mb-10 max-sm:mb-6 max-lg:hidden'>
          <div className='flex border border-gray-200 rounded-full overflow-hidden'>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  ' flex justify-center items-center lg:w-[178px] py-2 text-[16px] font-medium transition-colors duration-200',
                  'border-r border-gray-200 last:border-none',
                  activeTab === tab ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className='lg:hidden mx-auto flex gap-1.5  overflow-x-auto rounded-full border border-gray-200 bg-white p-2 max-w-[444px] h-[54px] mb-8'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition hover:bg-orange-600 hover:text-white',
                activeTab === tab && 'bg-orange-600 text-white rounded-full transition'
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

{
  /* <div className='flex flex-wrap justify-center gap-2 mb-10'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'cursor-pointer py-2 px-6 text-[16px] font-medium border rounded-full transition-colors duration-200',
                activeTab === tab ? 'bg-orange-600 text-white border-orange-600' : 'border-gray-200 hover:bg-orange-100'
              )}
            >
              {tab}
            </button>
          ))}
        </div> */
}
