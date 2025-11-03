import NewsCard from './NewsItem';
import { News } from '@/types';

export const NewsList = ({ news }: { news: News[] }) => {
  return (
    <div className='flex flex-col max-lg:items-center gap-8 mx-auto'>
      {news.map((article) => (
        <NewsCard
          key={article.documentId}
          title={article.title}
          description={article.description}
          date={article.date}
          category={article.category}
          photo={article.photo}
          documentId={article.documentId}
        />
      ))}
    </div>
  );
};
