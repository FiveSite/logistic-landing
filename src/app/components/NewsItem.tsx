'use client';

import Image from 'next/image';
import TagIcon from '../../../public/icons/tag.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';

type NewCardProps = {
  title: string;
  description: string;
  date: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  documentId: string;
};

const NewsCard = ({ title, description, date, category, photo }: NewCardProps) => {
  return (
    <div className='flex gap-6.5 items-center'>
      <div className='max-w-[585px] bg-gray-100 flex items-center justify-center rounded-[8px] shrink-0'>
        {photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${photo.url}`}
            alt={title}
            width={256}
            height={176}
            className='object-cover w-full h-full xl:w-[585px]'
          />
        ) : (
          <div className='text-gray-400 text-xl'>🖼️</div>
        )}
      </div>

      <div className='flex flex-col '>
        <div className='text-[16px] flex items-center gap-2 mb-6'>
          <div className='flex items-center gap-2'>
            <CalendarIcon className='w-4 h-4' />
            {new Date(date).toLocaleDateString()}
          </div>
          <span>—</span>
          <div className='flex items-center gap-2'>
            <TagIcon className='w-4 h-4' />
            {category}
          </div>
        </div>
        <h3 className='text-[30px] leading-[30px] font-semibold mb-8'>{title}</h3>
        <p className='text-[16px] text-sm leading-relaxed line-clamp-3'>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
