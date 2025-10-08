import { NewsDetails } from '@/app/news/NewsDetails';
import { getOneNews } from '@/services/api';

const CardNewsDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log('id', id);
  const data = await getOneNews(id);
  console.log(data);

  return <div className='bg-[#F6F6F6]'>{data && <NewsDetails news={data} />}</div>;
};

export default CardNewsDetailsPage;
