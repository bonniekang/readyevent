"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { events } from "./list";

export type EventActionState = {
  success?: string;
  error?: string;
};

export type TEventData = z.infer<typeof eventSchema>;

const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  creator: z.string().min(1, "Creator name is required"),
  members: z.array(z.string().min(1)).min(1, "At least one member is required"),
  start: z.string().optional().default(""),
  end: z.string().optional().default(""),
  timezone: z.string().optional().default(""),
  selected: z.boolean().optional().default(false),
});

export async function createEvent(
  prevState: EventActionState,
  formData: FormData
) {
  formData.append("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);

  const parse = eventSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    creator: formData.get("creator"),
    members: formData.getAll("members"),
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    timezone: formData.get("timezone") || "UTC",
    selected: false,
  });

  if (!parse.success) {
    return { error: "Failed to create event: Invalid data" };
  }

  const newEvent = {
    id: `event${events.length + 1}`,
    ...parse.data,
  };

  try {
    events.push(newEvent);
    console.log("New Event Created:", newEvent, events);

    revalidatePath("/");

    return { success: `Event "${newEvent.name}" created successfully!` };
  } catch (e) {
    console.error("Failed to create event", e);
    return { error: "Failed to create event" };
  }
}

export async function editEvent(
  prevState: EventActionState,
  formData: FormData
) {
  formData.append("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);

  const parse = eventSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    creator: formData.get("creator"),
    members: formData.getAll("members"),
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    timezone: formData.get("timezone") || "UTC",
    selected: false,
  });

  if (!parse.success) {
    return { error: "Invalid data" };
  }

  try {
    const updatedEvent = parse.data;
    const eventIndex = events.findIndex(
      (event) => event.id === updatedEvent.id
    );

    if (eventIndex !== -1) {
      events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
      revalidatePath("/");
      return { success: `Event "${updatedEvent.name}" updated successfully!` };
    } else {
      return { error: "Event not found" };
    }
  } catch (e) {
    console.error("Failed to edit event", e);
    return { error: "Event not found" };
  }
}
