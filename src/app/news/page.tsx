import { fetchNews } from '@/services/api';
import { NewsList } from './News';

export default async function NewsPage() {
  const news = await fetchNews();

  return (
    <div className='bg-[#F6F6F6]'>
      <div className='xl:px-[160px] md:px-10 max-md:px-4 pb-[60px] mx-auto'>
        <div className='flex items-center justify-between pb-10 max-sm:flex-col max-sm:justify-center max-sm:gap-4 pt-[160px]'>
          <h1 className='text-[36px] leading-[36px] font-bold whitespace-nowrap'>Latest news</h1>
        </div>

        <div className='h-[1px] w-full bg-gray-200 max-sm:hidden'></div>

        <div className='sm:mt-10'>
          <NewsList news={news} />
        </div>
      </div>
    </div>
  );
}
