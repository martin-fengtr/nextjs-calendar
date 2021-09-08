import { FunctionComponent, useContext, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { CalendarContext } from 'contexts/calendar';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { useEvents } from 'hooks/useEvents';
import { WeekCell } from './WeekCell';

export interface WeekProps {
  children?: never;
}

export const Week: FunctionComponent<WeekProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { events } = useEvents();
  const { activeDate, viewMode } = useContext(CalendarContext);

  const dates = useMemo(() => {
    const startDate = startOfWeek(activeDate);
    return [...Array(7)].map((_, index: number) => addDays(startDate, index));
  }, [activeDate]);

  const classes = {
    root: 'h-full flex flex-col flex-1',
    weekContainer: 'pl-[48px] pr-[17px] flex border border-blueGray-200',
    weekCell: (date: Date) =>
      clsx('h-[36px] flex flex-1 justify-center items-center', {
        'text-blue-400': isToday(date),
      }),
    scroll: 'flex-1 overflow-x-hidden overflow-y-scroll max-h-[calc(100vh-64px-48px)]',
    dateContainer: 'flex divide-x-[1px] divide-blueGray-200',
    timeContainer: 'flex flex-col',
    timeCell: 'w-[48px] h-[48px] flex justify-end items-start',
    am: 'mt-[2px] ml-[2px] text-[10px]',
  };

  if (viewMode !== 'week') {
    return null;
  }

  return (
    <div ref={ref} className={classes.root}>
      <div className={classes.weekContainer}>
        {dates.map((date) => (
          <div key={date.toDateString()} className={classes.weekCell(date)}>
            {format(date, 'E d')}
          </div>
        ))}
      </div>

      <div className={classes.scroll}>
        <div className={classes.dateContainer}>
          <div className={classes.timeContainer}>
            {[...Array(24)].map((_, index: number) => (
              <div key={`time-${index}`} className={classes.timeCell}>
                <span>{format(new Date().setHours(index), 'h')}</span>
                <span className={classes.am}>{format(new Date().setHours(index), 'a')}</span>
              </div>
            ))}
          </div>

          {dates.map((date) => (
            <WeekCell
              key={date.toISOString()}
              date={date}
              events={events.filter((item) =>
                isWithinInterval(date, {
                  start: new Date(item.activityDateTime.toDateString()),
                  end: new Date(item.endDateTime.toDateString()),
                }),
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
