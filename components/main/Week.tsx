import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { Event } from 'models/Event';
import { WeekCell } from './WeekCell';

export interface WeekProps {
  activeDate: Date;
  events: Event[];
  children?: never;
}

export const Week: FunctionComponent<WeekProps> = ({ activeDate, events }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  const dates = useMemo(() => {
    const startDate = startOfWeek(activeDate);
    return [...Array(7)].map((_, index: number) => addDays(startDate, index));
  }, [activeDate]);

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref]);

  return (
    <div className="h-full flex flex-col">
      {/* weekdays */}
      <div className="pl-[48px] pr-[17px] flex border border-blueGray-200">
        {dates.map((date) => (
          <div
            key={date.toDateString()}
            className={clsx('h-[36px] flex flex-1 justify-center items-center', {
              'text-blue-400': isToday(date),
            })}
          >
            {format(date, 'E d')}
          </div>
        ))}
      </div>

      <div
        ref={ref}
        className="flex-1 overflow-x-hidden overflow-y-scroll"
        style={height > 0 ? { maxHeight: height } : {}}
      >
        {height > 0 && (
          <div className="flex divide-x-[1px] divide-blueGray-200">
            {/* time */}
            <div className="flex flex-col">
              {[...Array(24)].map((_, index: number) => (
                <div key={`time-${index}`} className="w-[48px] h-[48px] flex justify-end items-start">
                  <span>{format(new Date(2021, 0, 1, 0 + index), 'h')}</span>
                  <span className="mt-[2px] ml-[2px] text-[10px]">{format(new Date(2021, 0, 1, 0 + index), 'a')}</span>
                </div>
              ))}
            </div>

            {/* date */}
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
        )}
      </div>
    </div>
  );
};
