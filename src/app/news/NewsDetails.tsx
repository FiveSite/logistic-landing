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
        rootMargin: '0px 0px -60% 0px', // щоб активувалось трохи раніше
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
    <div className='px-[166px] py-[60px] pt-[160px]'>
      <div className='mx-auto max-w-[1120px] mb-10'>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${news.photo.url}`}
          alt='photo'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full max-h-[360px]'
          priority
        />
      </div>

      <div className='flex gap-[80px]'>
        <aside className='min-w-[240px] max-w-[300px] '>
          {news.content && news.content.length > 0 && <h2 className='text-[30px] mb-12 font-semibold'>Навігація</h2>}
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

        <div className='flex-1 max-w-[800px]'>
          <h1 className='text-[30px] font-semibold mb-8'>{news.title}</h1>
          <div className='text-[16px] flex items-center gap-2 mb-6'>
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

          {news.content?.map(({ title, body, id }) => (
            <section
              key={id}
              ref={(el) => {
                sectionRefs.current[id] = el;
              }}
              data-id={id}
              className='mb-12 scroll-mt-24' // scroll-mt for offset after scroll
            >
              <h2 className='text-[30px] font-semibold mb-4'>{title}</h2>
              <p className='text-[16px]'>{body}</p>
            </section>
          ))}
        </div>
      </div>

      <ArticlesNewsSection />
    </div>
  );
};

// import { News } from '@/types';
// import TagIcon from '../../../public/icons/tag.svg';
// import CalendarIcon from '../../../public/icons/calendar.svg';
// import Image from 'next/image';
// import { ArticlesNewsSection } from './ArticlesSection';

// interface NewsProp {
//   news: News;
// }

// export const NewsDetails = ({ news }: NewsProp) => {
//   return (
//     <div className='px-[166px] py-[60px] pt-[160px]'>
//       <div className='mx-auto max-w-[1120px] mb-10'>
//         <Image
//           src={`${process.env.NEXT_PUBLIC_API_URL}${news.photo.url}`}
//           alt='photo'
//           width={0}
//           height={0}
//           sizes='100vw'
//           className='w-full max-h-[360px]'
//           priority
//         />
//       </div>
//       <div className='flex gap-[80px]'>
//         <aside className='min-w-[240px] max-w-[300px]'>
//           {news.content && news.content.length > 0 && <h2 className='text-[30px] mb-12 font-semibold'>Navigation</h2>}
//           <div className='flex flex-col gap-10'>
//             {news &&
//               news.content &&
//               news?.content.map(({ title, id }) => (
//                 <button
//                   key={id}
//                   //onClick={() => setActiveSection(section.id)}
//                   className='text-left text-[20px] leading-[20px]'
//                 >
//                   {title}
//                 </button>
//               ))}
//           </div>
//         </aside>

//         <div className='flex-1 max-w-[800px]'>
//           <h1 className='text-[30px] font-semibold mb-8'>{news.title}</h1>
//           <div className='text-[16px] flex items-center gap-2 mb-6'>
//             <div className='flex items-center gap-2'>
//               <CalendarIcon className='w-4 h-4' />
//               {new Date(news.date).toLocaleDateString()}
//             </div>
//             <span>—</span>
//             <div className='flex items-center gap-2'>
//               <TagIcon className='w-4 h-4' />
//               {news.category}
//             </div>
//           </div>
//           {news.content &&
//             news.content.map(({ title, body, id }) => (
//               <div key={id} className='mb-6'>
//                 <h2 className='text-[30px] font-semibold mb-6'>{title}</h2>
//                 <p className='text-[16px]'>{body}</p>
//               </div>
//             ))}
//         </div>
//       </div>

//       <ArticlesNewsSection />
//     </div>
//   );
// };
