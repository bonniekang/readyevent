import { FC } from "react";
import Link from "next/link";

type EventProps = {
  eventData: {
    id: string;
    name: string;
    description: string;
    start: string;
    end: string;
    timezone: string;
    creator: string;
    members: string[];
  };
};

export const EventItem: FC<EventProps> = ({ eventData }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">{eventData.name}</h2>
      <p className="text-gray-600">{eventData.description}</p>
      <p className="text-gray-500">
        <strong>Creator:</strong> {eventData.creator}
      </p>
      <p className="text-gray-500">
        <strong>Members:</strong> {eventData.members.join(", ")}
      </p>
      <p className="text-gray-500">
        <strong>Start:</strong> {eventData.start} ({eventData.timezone})
      </p>
      <p className="text-gray-500">
        <strong>End:</strong> {eventData.end} ({eventData.timezone})
      </p>
      <button>
        <Link href={`/events/${eventData.id}/edit`}>Edit Event</Link>
      </button>
      <button>
        <Link href={`/events/${eventData.id}/availability`}>
          Check Availability
        </Link>
      </button>
    </div>
  );
};

export default EventItem;
