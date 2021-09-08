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

  const classes = {
    root: clsx('w-full h-full p-[8px] text-[12px]', {
      'border border-blue-400': isToday(date),
    }),
    date: 'mb-[8px]',
  };
  const dateLabel = showMonth ? format(date, 'MMM d') : date.getDate();

  return (
    <div ref={ref} className={classes.root}>
      <p className={classes.date}>{dateLabel}</p>

      {events.map((event) => (
        <MonthEvent key={event.id} event={event} />
      ))}
    </div>
  );
};
