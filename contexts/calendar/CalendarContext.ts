import { createContext } from 'react';
import { Event } from 'models/Event';

export type ViewMode = 'month' | 'week';

export interface CalendarContextProps {
  viewMode: ViewMode;
  activeDate: Date;
  isModalOpen?: boolean;
  modalEvent?: Event;
  toggleViewMode: () => void;
  openModal: (event?: Event) => void;
  closeModal: (refresh?: boolean) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  nextWeek: () => void;
  prevWeek: () => void;
  goToday: () => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
  viewMode: 'month',
  activeDate: new Date(),
  toggleViewMode: () => null,
  openModal: () => null,
  closeModal: () => null,
  nextMonth: () => null,
  prevMonth: () => null,
  nextWeek: () => null,
  prevWeek: () => null,
  goToday: () => null,
});
