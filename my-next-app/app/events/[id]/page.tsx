/**
 * event-item
 * check-availability
 * todos
 * edit-event
 */
import { events } from "@/app/components/event/list";
import { EventItem } from "@/app/components/event/item";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

const getEventById = (id: string) => {
  return events.find((event) => event.id === id);
};

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return <p className="text-center text-red-500">Event not found</p>;
  }

  return <EventItem eventData={event} />;
}
