import EventDetails from '@/app/events/EventDetails';
import { getOneEvent } from '@/services/api';

const CardEventsDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log('id', id);
  const data = await getOneEvent(id);
  console.log(data);

  return <div className='pb-[60px]'>{data && <EventDetails event={data} />}</div>;
};

export default CardEventsDetails;
