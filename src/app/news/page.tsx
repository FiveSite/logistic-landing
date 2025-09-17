'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import NewsCard from '../components/NewsItem';
import { fetchNews } from '@/services/api';
import { News } from '@/types';
import { NewsList } from '../components/News';
import { EventsList } from '../components/Events';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('news');

  useEffect(() => {
    if (tab === 'events') {
      setActiveTab('events');
    } else {
      setActiveTab('news');
    }
  }, [tab]);

  const handleTabClick = (tabName: string) => {
    const params = new URLSearchParams();
    params.set('tab', tabName);
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className='px-[166px] pb-[60px]'>
      <div className='flex items-center justify-between pb-10  pt-[60px]'>
        <h1 className='text-[36px] leading-[36px] font-bold'>
          {activeTab === 'news' ? 'Latest articles' : 'Latest events'}
        </h1>

        <div className='flex'>
          <button
            className={clsx(
              activeTab === 'news' && 'text-white bg-orange-600',
              'text-[16px] font-semibold border border-gray-200 border-r-0 rounded-l-[24px] cursor-pointer flex items-center justify-center h-[36px] w-[182px] '
            )}
            onClick={() => handleTabClick('news')}
          >
            News
          </button>
          <button
            className={clsx(
              activeTab === 'events' && 'text-white bg-orange-600 ',
              'text-[16px] font-semibold border border-gray-200 border-l-0 rounded-r-[24px] cursor-pointer flex items-center justify-center h-[36px] w-[182px]'
            )}
            onClick={() => handleTabClick('events')}
          >
            Events
          </button>
        </div>
      </div>

      <div className='h-[1px] w-full bg-gray-200'></div>

      <div className='mt-10'>
        {activeTab === 'news' && <NewsList />}
        {activeTab === 'events' && <EventsList />}
      </div>
    </div>
  );
}
