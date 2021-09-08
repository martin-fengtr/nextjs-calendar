import { FunctionComponent, useContext } from 'react';
import { CalendarContext } from 'contexts/calendar';
import { Event } from 'models/Event';

export interface MonthEventProps {
  event: Event;
  children?: never;
}

export const MonthEvent: FunctionComponent<MonthEventProps> = ({ event }) => {
  const { openModal } = useContext(CalendarContext);

  const handleClick = () => {
    openModal(event);
  };

  const classes = {
    root: 'px-[2px] hover:bg-blue-200 text-[12px] overflow-ellipsis cursor-pointer',
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      {event.subject}
    </div>
  );
};
