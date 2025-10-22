'use client';

import Image from 'next/image';
import TagIcon from '../../../public/icons/tag.svg';
import CalendarIcon from '../../../public/icons/calendar.svg';
import Link from 'next/link';
import { Media } from '@/types';

type NewCardProps = {
  title: string;
  description: string;
  date: string;
  category: string;
  photo?: Media | null;
  documentId: string;
};

const NewsCard = ({ title, description, date, category, photo, documentId }: NewCardProps) => {
  return (
    <div className='flex gap-6.5 max-md:gap-0 items-center  max-md:flex-col max-md:max-w-[343px]'>
      <Link
        href={`/news/${documentId}`}
        className='max-w-[585px] bg-gray-100 flex items-center justify-center rounded-[8px]  max-md:rounded-b-none shrink-0'
      >
        {photo ? (
          <Image
            src={photo?.url ?? ''}
            alt={title}
            width={585}
            height={343}
            className='object-cover w-full h-full max-md:w-[343px] max-md:h-[354px] rounded-[8px] max-md:rounded-b-none'
          />
        ) : (
          <div className='text-gray-400 text-xl'>🖼️</div>
        )}
      </Link>

      <div className='flex flex-col max-md:bg-white max-md:p-4 rounded-b-[8px]'>
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
        <Link
          href={`/news/${documentId}`}
          className='text-[30px] leading-none max-md:text-[24px] font-semibold mb-8 hover:underline'
        >
          {title}
        </Link>
        <p className='text-[16px] text-sm leading-relaxed line-clamp-3'>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
