import { Event } from "@/types/Event";

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(
    "https://react-http-b7917-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events: Event[] = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async (): Promise<Event[]> => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (
  id: string | string[] | undefined
): Promise<Event | undefined> => {
  if (typeof id !== "string") {
    return undefined;
  }

  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<Event[]> => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
