import { FunctionComponent } from 'react';
import clsx from 'clsx';
import addMinutes from 'date-fns/addMinutes';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import isSameMinute from 'date-fns/isSameMinute';
import isToday from 'date-fns/isToday';
import startOfMinute from 'date-fns/startOfMinute';
import { Event } from 'models/Event';

export interface WeekCellProps {
  date: Date;
  events: Event[];
  children?: never;
}

export const WeekCell: FunctionComponent<WeekCellProps> = ({ date, events }) => {
  const coeff = 1000 * 60 * 30;
  const nearestTime = new Date(Math.round(new Date().getTime() / coeff) * coeff);

  const classes = {
    root: clsx('relative flex flex-col flex-1 items-stretch divide-y-[1px] divide-blueGray-200', {
      'bg-blue-50': isToday(date),
    }),
    event: 'absolute left-0 right-[16px] px-[2px] bg-blue-200 text-[12px] overflow-hidden',
    timeCell: (minutes: number) => {
      const time = addMinutes(startOfMinute(date), minutes);
      return clsx('h-[24px]', {
        '!border-t-[2px] !border-blue-400': isSameMinute(time, nearestTime),
      });
    },
  };

  return (
    <div className={classes.root}>
      {[...Array(48)].map((_, index: number) => (
        <div key={`timesheet-${index}`} className={classes.timeCell(30 * index)}></div>
      ))}
      {events.map((event) => {
        const yStart = Math.max(0, differenceInMinutes(event.activityDateTime, startOfMinute(date)));
        const yEnd = Math.max(0, differenceInMinutes(event.endDateTime, startOfMinute(date)));
        const height = Math.max(yEnd - yStart);
        const yStartPercent = (yStart * 100) / (48 * 30);
        const heightPercent = (height * 100) / (48 * 30);

        return (
          <div
            key={event.activityDateTime.toString()}
            className={classes.event}
            style={{
              top: `${yStartPercent}%`,
              height: `${heightPercent}%`,
            }}
          >
            <p className="font-bold">{event.subject}</p>
            <p>{event.description}</p>
            <p>{`${format(event.activityDateTime, 'ha')}-${format(event.endDateTime, 'ha')}`}</p>
          </div>
        );
      })}
    </div>
  );
};
