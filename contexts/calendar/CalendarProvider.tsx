import { FunctionComponent, ReactNode, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import subMonths from 'date-fns/subMonths';
import subWeeks from 'date-fns/subWeeks';
import { CalendarContext, ViewMode } from './CalendarContext';

export interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: FunctionComponent<CalendarProviderProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'month' ? 'week' : 'month'));
  };

  const nextMonth = () => {
    setActiveDate((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setActiveDate((prev) => subMonths(prev, 1));
  };

  const nextWeek = () => {
    setActiveDate((prev) => addWeeks(prev, 1));
  };

  const prevWeek = () => {
    setActiveDate((prev) => subWeeks(prev, 1));
  };

  const goToday = () => {
    setActiveDate(new Date());
  };

  return (
    <CalendarContext.Provider
      value={{
        viewMode,
        activeDate,
        toggleViewMode,
        nextMonth,
        prevMonth,
        nextWeek,
        prevWeek,
        goToday,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
