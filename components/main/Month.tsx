import { FunctionComponent, useContext, useEffect } from 'react';
import { useCalendar } from '@h6s/calendar';
import clsx from 'clsx';
import { CalendarContext } from 'contexts/calendar';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfDay from 'date-fns/startOfDay';
import { useEvents } from 'hooks/useEvents';
import { MonthCell } from './MonthCell';

export interface MonthProps {
  children?: never;
}

export const Month: FunctionComponent<MonthProps> = () => {
  const { events } = useEvents();
  const { viewMode, activeDate } = useContext(CalendarContext);
  const { headers, body, navigation } = useCalendar({ defaultDate: activeDate });

  const classes = {
    root: 'h-full flex flex-col flex-1',
    weekContainer: 'flex border-b border-blueGray-200',
    weekCell: 'h-[36px] flex flex-1 justify-center items-center',
    daysContainer: 'flex flex-col flex-1 divide-y-[1px] divide-blueGray-200',
    daysRow: 'flex flex-1 divide-x-[1px] divide-blueGray-200',
    dayCell: (date: Date) =>
      clsx('flex-1', {
        'bg-blueGray-100': !isSameMonth(activeDate, date),
      }),
  };

  useEffect(() => {
    navigation.setDate(activeDate);
  }, [navigation, activeDate]);

  if (viewMode !== 'month') {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.weekContainer}>
        {headers.weekDays.map(({ key, value }) => (
          <div key={key} className={classes.weekCell}>
            {format(value, 'E')}{' '}
          </div>
        ))}
      </div>

      <div className={classes.daysContainer}>
        {body.value.map(({ key: weekKey, value: days }) => (
          <div key={weekKey} className={classes.daysRow}>
            {days.map(({ key: dayKey, value }, index: number) => (
              <div key={dayKey} className={classes.dayCell(value)}>
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
