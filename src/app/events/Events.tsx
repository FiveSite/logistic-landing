import { Event } from '@/types';
import EventCard from './EventItem';

export const EventsList = ({ events }: { events: Event[] }) => {
  return (
    <div className='flex flex-col max-lg:items-center gap-8 mx-auto'>
      {events.map((event) => (
        <EventCard
          key={event.documentId}
          title={event.title}
          description={event.description}
          startDate={event.startDate}
          endDate={event.endDate}
          location={event.location}
          photo={event.photo}
          documentId={event.documentId}
        />
      ))}
    </div>
  );
};
