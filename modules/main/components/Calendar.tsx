import { FunctionComponent, useCallback, useEffect } from 'react';
import useCalendar from '@veccu/react-calendar';
import clsx from 'clsx';
import type { ViewMode } from 'contexts/calendar';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameWeek from 'date-fns/isSameWeek';

export interface CalendarProps {
  viewMode: ViewMode;
  activeDate: Date;
}

export const Calendar: FunctionComponent<CalendarProps> = ({ viewMode, activeDate }) => {
  const { headers, body, navigation } = useCalendar({ defaultDate: activeDate });

  useEffect(() => {
    navigation.setDate(activeDate);
  }, [navigation, activeDate]);

  const renderDate = useCallback(
    (key: string, value: Date) => {
      const isThisMonth = isSameMonth(activeDate, value);
      const isHighlight = viewMode === 'month' ? true : isSameWeek(activeDate, value);
      const className = clsx('p-[8px]', {
        'text-blueGray-400': !isThisMonth,
        'text-black': isThisMonth,
        'bg-blueGray-200': isHighlight,
      });
      return (
        <td key={key} align="center" className={className}>
          {getDate(value)}
        </td>
      );
    },
    [viewMode, activeDate],
  );

  return (
    <div className="p-[8px] text-[12px]">
      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => (
              <th key={key} className="pb-[4px]">
                {format(value, 'E')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key, value: days }) => (
            <tr key={key}>{days.map(({ key, value }) => renderDate(key, value))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
