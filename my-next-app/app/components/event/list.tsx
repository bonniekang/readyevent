import { FC } from "react";
import Link from "next/link";

type Event = {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  timezone: string;
  selected: boolean;
  creator: string;
  members: string[];
};

export const events: Event[] = [
  {
    id: "event1",
    name: "EVENT-1",
    description: "Description of Event-1",
    start: "2025-04-10T10:00:00",
    end: "2025-04-10T18:00:00",
    timezone: "Asia/Seoul",
    selected: false,
    creator: "Alice",
    members: ["Alice", "Bob"],
  },
  {
    id: "event2",
    name: "EVENT-2",
    description: "Description of Event-2",
    start: "2025-04-11T09:00:00",
    end: "2025-04-11T17:00:00",
    timezone: "America/New_York",
    selected: false,
    creator: "Bob",
    members: ["Alice", "Bob"],
  },
  {
    id: "event3",
    name: "EVENT-3",
    description: "Description of Event-3",
    start: "2025-04-12T08:00:00",
    end: "2025-04-12T16:00:00",
    timezone: "Europe/London",
    selected: false,
    creator: "Charlie",
    members: ["Alice", "Bob", "Charlie"],
  },
  {
    id: "event4",
    name: "EVENT-4",
    description: "Description of Event-4",
    start: "2025-04-13T11:00:00",
    end: "2025-04-13T19:00:00",
    timezone: "Australia/Sydney",
    selected: false,
    creator: "David",
    members: ["Alice", "Bob", "Charlie"],
  },
  {
    id: "event5",
    name: "EVENT-5",
    description: "Description of Event-5",
    start: "2025-04-14T13:00:00",
    end: "2025-04-14T20:00:00",
    timezone: "Europe/Berlin",
    selected: false,
    creator: "Eve",
    members: ["Alice", "Bob", "Charlie"],
  },
];

const formatDate = (dateString: string, timezone: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};

const EventList: FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Event List</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <Link
            key={event.id}
            className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            href={`/events/${event.id}`}
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {event.name}
            </h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500 text-sm">
              <strong>Creator:</strong> {event.creator}
            </p>
            <p className="text-gray-500">
              <strong>Members:</strong> {event.members.join("")}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Start:</strong> {formatDate(event.start, event.timezone)}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>End:</strong> {formatDate(event.end, event.timezone)}
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Timezone:</strong> {event.timezone}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
