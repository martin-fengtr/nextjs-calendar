import { FunctionComponent } from 'react';
import useCalendar from '@veccu/react-calendar';
import clsx from 'clsx';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameWeek from 'date-fns/isSameWeek';
import { ViewMode } from '@components/header';

export interface CalendarProps {
  viewMode: ViewMode;
  startDate: Date;
}

export const Calendar: FunctionComponent<CalendarProps> = ({ viewMode, startDate }) => {
  const { headers, body } = useCalendar();

  return (
    <div className="p-[8px] text-[12px]">
      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => (
              <th key={key} className="pb-[4px]">{format(value, 'E')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key, value: days }) => (
            <tr key={key}>
              {days.map(({ key, value }) => {
                const isThisMonth = isSameMonth(startDate, value);
                const isHighlight = viewMode === 'month' ? true : isSameWeek(startDate, value);
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
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
