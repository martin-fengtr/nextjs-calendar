import { FunctionComponent } from 'react';
import { Button } from 'components/common/button';
import { ViewMode } from 'contexts/calendar';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isSameWeek from 'date-fns/isSameWeek';

export interface HeaderProps {
  viewMode: ViewMode;
  startDate: Date;
  endDate?: Date;
  onRefresh?: () => void;
  toggleViewMode?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onToday?: () => void;
  onNewEvent?: () => void;
  onSignOut?: () => void;
  children?: never;
}

export const Header: FunctionComponent<HeaderProps> = ({
  viewMode,
  startDate,
  endDate,
  onRefresh,
  toggleViewMode,
  onNext,
  onPrev,
  onToday,
  onNewEvent,
  onSignOut,
}) => {
  const today = new Date();
  const isTodaySelected =
    (viewMode === 'week' && isSameWeek(today, startDate)) || (viewMode === 'month' && isSameMonth(today, startDate));

  return (
    <div className="h-[64px] p-[12px] flex flex-row items-center space-x-[8px] bg-blueGray-100 border-b border-blueGray-200">
      <span className="text-pink-400 w-[40px] h-[40px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path
            d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 2.839844 4 2 4.839844 2 6 L 2 13 L 48 13 L 48 6 C 48 4.839844 47.160156 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 2 15 L 2 46 C 2 47.160156 2.839844 48 4 48 L 46 48 C 47.160156 48 48 47.160156 48 46 L 48 15 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <div className="flex flex-col justify-between">
        <p className="text-[12px]">Calendar</p>
        <p className="font-bold">
          {viewMode === 'month'
            ? format(startDate, 'MMMM yyyy')
            : endDate
            ? `${format(startDate, 'MMMM d, yyyy')}-${format(endDate, 'MMMM d, yyyy')}`
            : format(startDate, 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="flex-1"></div>

      <div>
        <Button onClick={onPrev}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="20" height="20">
            <path
              d="M81.1,31.9c-1.2-1.2-3.1-1.2-4.2,0l-30,30c-1.2,1.2-1.2,3.1,0,4.2l30,30c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9 c1.2-1.2,1.2-3.1,0-4.2L53.2,64l27.9-27.9C82.3,34.9,82.3,33.1,81.1,31.9z"
              fill="currentColor"
            />
          </svg>
        </Button>
        <Button onClick={onNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="20" height="20">
            <path
              d="M46.9,96.1c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l30-30c1.2-1.2,1.2-3.1,0-4.2l-30-30c-1.2-1.2-3.1-1.2-4.2,0 c-1.2,1.2-1.2,3.1,0,4.2L74.8,64L46.9,91.9C45.7,93.1,45.7,94.9,46.9,96.1z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </div>

      <Button onClick={onToday} disabled={isTodaySelected}>
        Today
      </Button>

      <Button className="!ml-[24px]" onClick={onRefresh}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 L 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 14.205991 4 16.202724 4.9004767 17.650391 6.3496094 L 15 9 L 22 9 L 22 2 L 19.060547 4.9394531 C 17.251786 3.1262684 14.757292 2 12 2 z"
            fill="currentColor"
          />
        </svg>
      </Button>

      <Button onClick={toggleViewMode}>{viewMode === 'month' ? 'Month' : 'Week'}</Button>

      <Button variant="primary" onClick={onNewEvent}>
        New Event
      </Button>

      <Button onClick={onSignOut}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
          <path
            d="M 6 4 L 6 28 L 26 28 L 26 20 L 24 22 L 24 26 L 8 26 L 8 6 L 24 6 L 24 10 L 26 12 L 26 4 Z M 22.40625 11 L 21 12.40625 L 23.5625 15 L 13.90625 15 L 13.90625 17 L 23.5625 17 L 21 19.59375 L 22.40625 21 L 26.71875 16.71875 L 27.40625 16 L 26.71875 15.28125 Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
};
