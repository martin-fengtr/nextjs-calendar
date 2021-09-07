import { FunctionComponent, useEffect } from 'react';
import useCalendar from '@veccu/react-calendar';
import clsx from 'clsx';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfDay from 'date-fns/startOfDay';
import { Event } from 'models/Event';
import { MonthCell } from './MonthCell';

export interface MonthProps {
  activeDate: Date;
  events: Event[];
  children?: never;
}

export const Month: FunctionComponent<MonthProps> = ({ activeDate, events }) => {
  const { headers, body, navigation } = useCalendar({ defaultDate: activeDate });

  useEffect(() => {
    navigation.setDate(activeDate);
  }, [navigation, activeDate]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-blueGray-200">
        {headers.weekDays.map(({ key, value }) => (
          <div key={key} className="h-[36px] flex flex-1 justify-center items-center">
            {format(value, 'E')}
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1 divide-y-[1px] divide-blueGray-200">
        {body.value.map(({ key: weekKey, value: days }) => (
          <div key={weekKey} className="flex flex-1 divide-x-[1px] divide-blueGray-200">
            {days.map(({ key: dayKey, value }, index: number) => (
              <div
                key={dayKey}
                className={clsx('flex-1', {
                  'bg-blueGray-100': !isSameMonth(activeDate, value),
                })}
              >
                <MonthCell
                  date={value}
                  showMonth={index === 0 || value.getDate() === 1}
                  events={events.filter((item) =>
                    isWithinInterval(value, {
                      start: startOfDay(item.activityDateTime),
                      end: endOfDay(item.endDateTime),
                    }),
                  )}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
