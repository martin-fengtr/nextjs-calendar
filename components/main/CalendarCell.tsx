import { FunctionComponent, useContext } from 'react';
import clsx from 'clsx';
import { CalendarContext } from 'contexts/calendar';
import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameWeek from 'date-fns/isSameWeek';

export interface CalendarCellProps {
  date: Date;
  children?: never;
}

export const CalendarCell: FunctionComponent<CalendarCellProps> = ({ date }) => {
  const { activeDate, viewMode } = useContext(CalendarContext);
  const isThisMonth = isSameMonth(date, date);
  const isHighlight = viewMode === 'month' ? true : isSameWeek(activeDate, date);

  const classes = {
    root: clsx('p-[8px] text-[12px]', {
      'text-blueGray-400': !isThisMonth,
      'text-black': isThisMonth,
      'bg-blueGray-100': isHighlight,
    }),
  };

  return (
    <td align="center" className={classes.root}>
      {getDate(date)}
    </td>
  );
};
