import { FunctionComponent, useContext, useEffect } from 'react';
import { useCalendar } from '@h6s/calendar';
import { CalendarContext } from 'contexts/calendar';
import format from 'date-fns/format';
import { CalendarCell } from './CalendarCell';

export interface CalendarProps {
  children?: never;
}

export const Calendar: FunctionComponent<CalendarProps> = () => {
  const { activeDate } = useContext(CalendarContext);
  const { headers, body, navigation } = useCalendar({ defaultDate: activeDate });

  useEffect(() => {
    navigation.setDate(activeDate);
  }, [navigation, activeDate]);

  return (
    <div className="p-[8px]">
      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => (
              <th key={key} className="pb-[4px] text-[10px]">
                {format(value, 'E')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key: weekKey, value: days }) => (
            <tr key={weekKey}>
              {days.map(({ key: dateKey, value }) => (
                <CalendarCell key={dateKey} date={value} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
