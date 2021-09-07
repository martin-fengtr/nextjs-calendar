import { FunctionComponent } from 'react';
import { Event } from 'models/Event';

export interface MonthEventProps {
  event: Event;
}

export const MonthEvent: FunctionComponent<MonthEventProps> = ({ event }) => {
  return <div className="px-[2px] hover:bg-blue-200 text-[12px] overflow-ellipsis cursor-pointer">{event.subject}</div>;
};
