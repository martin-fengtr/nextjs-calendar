import { FunctionComponent, useContext, useMemo } from 'react';
import { Header } from 'components/common/header';
import { CalendarContext } from 'contexts/calendar';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import { signOut } from 'next-auth/client';
import { Calendar } from './Calendar';
import { Modal } from './Modal';
import { Month } from './Month';
import { Week } from './Week';

export interface MainProps {
  children?: never;
}

export const Main: FunctionComponent<MainProps> = () => {
  const {
    modalEvent,
    activeDate,
    viewMode,
    toggleViewMode,
    goToday,
    nextWeek,
    prevWeek,
    nextMonth,
    prevMonth,
    openModal,
  } = useContext(CalendarContext);

  const weekStart = useMemo(() => startOfWeek(activeDate), [activeDate]);
  const weekEnd = useMemo(() => endOfWeek(activeDate), [activeDate]);

  const classes = {
    root: 'h-full flex flex-col items-stretch',
    content: 'flex flex-1 divide-x-[2px] divide-blueGray-200',
  };

  const handleNewEvent = () => {
    openModal();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <div className={classes.root}>
        <Header
          viewMode={viewMode}
          startDate={weekStart}
          endDate={weekEnd}
          toggleViewMode={toggleViewMode}
          onNext={viewMode === 'month' ? nextMonth : nextWeek}
          onPrev={viewMode === 'month' ? prevMonth : prevWeek}
          onToday={goToday}
          onNewEvent={handleNewEvent}
          onSignOut={handleSignOut}
        />

        <div className={classes.content}>
          <Month />
          <Week />
          <Calendar />
        </div>
      </div>

      <Modal key={modalEvent?.id ?? new Date().toISOString()} />
    </>
  );
};
