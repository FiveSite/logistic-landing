'use client';

import { useEffect, useRef, useState } from 'react';
import { News } from '@/types';
import TagIcon from '../../../public/icons/tag.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import Image from 'next/image';
import { ArticlesNewsSection } from './ArticlesSection';
import clsx from 'clsx';

interface NewsProp {
  news: News;
}

export const NewsDetails = ({ news }: NewsProp) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveSection(id);
          }
        });
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.3,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [news.content]);

  const handleScrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='px-[160px] max-lg:px-0 py-[60px] pt-[160px]'>
      <div className='mx-auto max-w-[1124px] mb-10 max-sm:mb-4 max-sm:rounded-none rounded-[8px]'>
        <Image
          src={news.photo?.url || ''}
          alt='photo'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full max-h-[360px] max-sm:rounded-none rounded-[8px] '
          quality={75}
          loading='lazy'
        />
      </div>

      <div className='flex gap-[80px] max-lg:px-4 mx-auto max-w-[1124px]'>
        <aside className='min-w-[240px] max-w-[300px] max-lg:hidden'>
          {news.content && news.content.length > 0 && <h2 className='text-[30px] mb-12 font-semibold'>Navigation</h2>}
          <div className='flex flex-col gap-6'>
            {news.content?.map(({ title, id }) => (
              <button
                key={id}
                onClick={() => handleScrollTo(id.toString())}
                className={clsx(
                  'text-left text-[20px] leading-[20px] transition-font cursor-pointer',
                  activeSection === id.toString() ? 'font-semibold' : 'font-normal'
                )}
              >
                {title}
              </button>
            ))}
          </div>
        </aside>

        <div className='flex-1 max-w-[800px] '>
          <div className='flex flex-col'>
            <h1 className='text-[30px] leading-tight  font-semibold mb-8 order-1 max-sm:order-2'>{news.title}</h1>
            <div className='text-[16px] flex items-center gap-2 mb-6 order-2 max-sm:order-1'>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='w-4 h-4' />
                {new Date(news.date).toLocaleDateString()}
              </div>
              <span>—</span>
              <div className='flex items-center gap-2'>
                <TagIcon className='w-4 h-4' />
                {news.category}
              </div>
            </div>
          </div>

          {news.content?.map(({ title, body, id }, index, array) => (
            <section
              key={id}
              ref={(el) => {
                sectionRefs.current[id] = el;
              }}
              data-id={id}
              className={clsx('scroll-mt-24', index === array.length - 1 ? 'mb-0' : 'mb-8')}
            >
              <h2 className='text-[30px] max-sm:text-[24px] font-semibold mb-4'>{title}</h2>
              <p className='text-[16px]'>{body}</p>
            </section>
          ))}
        </div>
      </div>

      <ArticlesNewsSection />
    </div>
  );
};
