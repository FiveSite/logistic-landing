import { News } from '@/types';
import TagIcon from '../../../public/icons/tag.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import Image from 'next/image';
import { ArticlesNewsSection } from './ArticlesSection';

interface NewsProp {
  news: News;
}

export const NewsDetails = ({ news }: NewsProp) => {
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
        <aside className='min-w-[240px] max-w-[300px]'>
          <h2 className='text-[30px] mb-12 font-semibold'>Navigation</h2>
          <div className='flex flex-col gap-10'>
            {news &&
              news.content &&
              news?.content.map(({ title, id }) => (
                <button
                  key={id}
                  //onClick={() => setActiveSection(section.id)}
                  className='text-left text-[20px] leading-[20px]'
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
          {news.content &&
            news.content.map(({ title, body, id }) => (
              <div key={id} className='mb-6'>
                <h2 className='text-[30px] font-semibold mb-6'>{title}</h2>
                <p className='text-[16px]'>{body}</p>
              </div>
            ))}
        </div>
      </div>

      <ArticlesNewsSection />
    </div>
  );
};
