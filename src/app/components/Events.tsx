'use client';

import { useEffect, useState } from 'react';
import { fetchEvents } from '@/services/api';
import { Event } from '@/types';
import EventCard from './EventItem';

export const EventsList = () => {
  const [events, setEvents] = useState<Event[] | []>([]);

  console.log('events', events);
  const getEvents = async () => {
    const events = await fetchEvents();
    setEvents(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='flex flex-col gap-8 '>
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
