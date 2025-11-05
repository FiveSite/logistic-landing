import EventDetails from '@/app/events/EventDetails';
import { getOneEvent } from '@/services/api';

const CardEventsDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log('id', id);

  const data = await getOneEvent(id);

  return <div className='pb-[50px] max-lg:pb-10 bg-[#F6F6F6]'>{data && <EventDetails event={data} />}</div>;
};

export default CardEventsDetails;
