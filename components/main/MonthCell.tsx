import { FunctionComponent, useRef } from 'react';
import clsx from 'clsx';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { Event } from 'models/Event';
import { MonthEvent } from './MonthEvent';

export interface MonthCellProps {
  date: Date;
  events: Event[];
  showMonth?: boolean;
  children?: never;
}

export const MonthCell: FunctionComponent<MonthCellProps> = ({ date, events, showMonth }) => {
  const ref = useRef<HTMLDivElement>(null);

  const rootClass = clsx('w-full h-full p-[8px] text-[12px]', {
    'border border-blue-200': isToday(date),
  });
  const dateLabel = showMonth ? format(date, 'MMM d') : date.getDate();

  return (
    <div ref={ref} className={rootClass}>
      <p className="mb-[8px]">{dateLabel}</p>

      {events.map((event) => (
        <MonthEvent key={event.id} event={event} />
      ))}
    </div>
  );
};
