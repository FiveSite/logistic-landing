import { NewsDetails } from '@/app/news/NewsDetails';
import { getOneNews } from '@/services/api';

const CardNewsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data = await getOneNews(id);

  return <div className='bg-[#F6F6F6]'>{data && <NewsDetails news={data} />}</div>;
};

export default CardNewsDetailsPage;
