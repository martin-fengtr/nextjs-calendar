import { FunctionComponent, useContext, useMemo } from 'react';
import { Header } from 'components/common/header';
import { CalendarContext } from 'contexts/calendar';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import { useEvents } from 'hooks/useEvents';
import { signOut } from 'next-auth/client';
import { Calendar } from './Calendar';
import { Month } from './Month';
import { Week } from './Week';

export interface MainProps {
  children?: never;
}

export const Main: FunctionComponent<MainProps> = () => {
  const { activeDate, viewMode, toggleViewMode, goToday, nextWeek, prevWeek, nextMonth, prevMonth } =
    useContext(CalendarContext);

  const { events } = useEvents();

  const weekStart = useMemo(() => startOfWeek(activeDate), [activeDate]);
  const weekEnd = useMemo(() => endOfWeek(activeDate), [activeDate]);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

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
        onSignOut={handleSignOut}
      />

      <div className="flex flex-1 divide-x-[2px] divide-blueGray-200">
        <div className="flex-1">
          {viewMode === 'month' ? (
            <Month activeDate={activeDate} events={events} />
          ) : (
            <Week activeDate={activeDate} events={events} />
          )}
        </div>
        <Calendar viewMode={viewMode} activeDate={activeDate} />
      </div>
    </div>
  );
};
