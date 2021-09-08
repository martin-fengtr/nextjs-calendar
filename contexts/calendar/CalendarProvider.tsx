import { FunctionComponent, ReactNode, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import subMonths from 'date-fns/subMonths';
import subWeeks from 'date-fns/subWeeks';
import { Event } from 'models/Event';
import { mutate } from 'swr';
import { CalendarContext, ViewMode } from './CalendarContext';

export interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: FunctionComponent<CalendarProviderProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEvent, setModalEvent] = useState<Event>();

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'month' ? 'week' : 'month'));
  };

  const openModal = (event?: Event) => {
    setModalEvent(event);
    setModalOpen(true);
  };

  const closeModal = (refresh = true) => {
    if (refresh) {
      mutate('events');
    }
    setModalEvent(undefined);
    setModalOpen(false);
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
        isModalOpen,
        modalEvent,
        toggleViewMode,
        openModal,
        closeModal,
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
