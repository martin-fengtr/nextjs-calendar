import { createContext } from 'react';

export type ViewMode = 'month' | 'week';

export interface CalendarContextProps {
  viewMode: ViewMode;
  activeDate: Date;
  toggleViewMode: () => void;
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
  nextMonth: () => null,
  prevMonth: () => null,
  nextWeek: () => null,
  prevWeek: () => null,
  goToday: () => null,
});
