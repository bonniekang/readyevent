import { FC } from "react";

type EventProps = {
  eventData: {
    id: string;
    name: string;
    desc: string;
    start: string;
    end: string;
    timezone: string;
    creator: string;
  };
};

export const EventItem: FC<EventProps> = ({ eventData }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">{eventData.name}</h2>
      <p className="text-gray-600">{eventData.desc}</p>
      <p className="text-gray-500">
        <strong>Creator:</strong> {eventData.creator}
      </p>
      <p className="text-gray-500">
        <strong>Start:</strong> {eventData.start} ({eventData.timezone})
      </p>
      <p className="text-gray-500">
        <strong>End:</strong> {eventData.end} ({eventData.timezone})
      </p>
    </div>
  );
};

export default EventItem;
