import { FunctionComponent, useContext, useMemo } from 'react';
import { Header } from 'components/header';
import { CalendarContext } from 'contexts/calendar';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar } from './Calendar';

export interface MainProps {
  children?: never;
}

export const Main: FunctionComponent<MainProps> = () => {
  const { activeDate, viewMode, toggleViewMode, goToday, nextWeek, prevWeek, nextMonth, prevMonth } =
    useContext(CalendarContext);

  const weekStart = useMemo(() => startOfWeek(activeDate), [activeDate]);
  const weekEnd = useMemo(() => endOfWeek(activeDate), [activeDate]);

  return (
    <div className="h-full flex flex-col items-stretch">
      <Header
        viewMode={viewMode}
        startDate={weekStart}
        endDate={weekEnd}
        toggleViewMode={toggleViewMode}
        onNext={viewMode === 'month' ? nextMonth : nextWeek}
        onPrev={viewMode === 'month' ? prevMonth : prevWeek}
        onToday={goToday}
      />

      <div className="flex flex-1">
        <div className="flex-1"></div>
        <Calendar viewMode={viewMode} activeDate={activeDate} />
      </div>
    </div>
  );
};
