"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  createEvent,
  editEvent,
  EventActionState,
  TEventData,
} from "./form-action";

const initialState: EventActionState = {
  success: "",
  error: "",
};

const initialFormData = {
  id: "",
  name: "",
  description: "",
  start: "",
  end: "",
  timezone: "",
  creator: "",
  members: "",
};

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
};

export const EventForm = ({ event }: { event?: TEventData }) => {
  const serverAction = event?.id ? editEvent : createEvent;

  const [state, formAction] = useActionState(serverAction, initialState);
  //사용자의 입력 반영
  const [formData, setFormData] = useState(event ?? initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form action={formAction}>
      {state?.success && (
        <p className="text-green-500 mt-4">{state?.success}</p>
      )}
      {state?.error && <p className="text-red-500 mt-4">{state?.error}</p>}

      {/* 기존 이벤트 수정 시 id 필드 포함 */}
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <label className="block text-gray-700">Event Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <label className="block text-gray-700 mt-2">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <label className="block text-gray-700 mt-2">Creator</label>
      <input
        type="text"
        name="creator"
        value={formData.creator}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <label className="block text-gray-700 mt-2">Members</label>
      <input
        type="text"
        name="members"
        value={formData.members}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <SubmitButton />
    </form>
  );
};
