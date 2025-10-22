'use client';

import { useEffect, useState } from 'react';
import NewsCard from './NewsItem';
import { fetchNews } from '@/services/api';
import { News } from '@/types';

export const NewsList = () => {
  const [news, setNews] = useState<News[] | []>([]);

  console.log('news', news);
  const getNews = async () => {
    const news = await fetchNews();
    setNews(news);
  };

  useEffect(() => {
    getNews();
  }, []);

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
