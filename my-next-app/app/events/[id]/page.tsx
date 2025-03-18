/**
 * event-item
 * check-availability
 * todos
 * edit-event
 *
 * 이벤트를 생성함 - 이벤트 폼 (수정도 동일한 폼) - 생성 후 리스트 페이지 - 리스트 페이지의 이벤트 아이템 선택
 * - 이벤트 디테일 페이지 - 이벤트 name, decription, creator, members 확인할 수 있음 - 각 멤버들이 가능한 스케줄을 선택할 수 있음(아이콘 클릭)
 * - 가능한 날짜, 시간 선택가능한 페이지 표시 - 이벤트 디테일에서 각 멤버들이 선택한 가능 스케줄 확인 가능 - 모든 멤버들이 선택 완료했을 경우 추천 날짜 보여줌
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return <p className="text-center text-red-500">Event not found</p>;
  }

  return <EventItem eventData={event} />;
}
