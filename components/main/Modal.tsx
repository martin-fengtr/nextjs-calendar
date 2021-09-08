import { ChangeEvent, FormEvent, FunctionComponent, MouseEvent, useContext, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import { Button } from 'components/common/button';
import { Portal } from 'components/common/portal';
import { CalendarContext } from 'contexts/calendar';
import addMinutes from 'date-fns/addMinutes';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import startOfMinute from 'date-fns/startOfMinute';
import { useEvents } from 'hooks/useEvents';
import { Event } from 'models/Event';
import 'react-datepicker/dist/react-datepicker.css';

export interface ModalProps {
  children?: never;
}

export const Modal: FunctionComponent<ModalProps> = () => {
  const { createEvent, updateEvent, deleteEvent } = useEvents();
  const { modalEvent, isModalOpen, closeModal } = useContext(CalendarContext);

  const isCreating = useMemo(() => !modalEvent || !modalEvent.id, [modalEvent]);
  const [isEditing, setEditing] = useState<boolean>(false);

  const startDate = startOfMinute(new Date());
  const endDate = addMinutes(startDate, 90);
  const [event, setEvent] = useState<Event>({
    id: modalEvent?.id,
    activityDate: modalEvent?.activityDate ?? format(startDate, 'yyyy-MM-dd'),
    activityDateTime: modalEvent?.activityDateTime ?? startDate,
    endDateTime: modalEvent?.endDateTime ?? endDate,
    durationInMinutes: modalEvent?.durationInMinutes ?? 90,
    subject: modalEvent?.subject ?? '',
    description: modalEvent?.description ?? '',
  });

  const classes = {
    backdrop: 'fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-30 flex flex-col justify-center items-center',
    wrapper: 'relative w-[480px] p-[16px] bg-white rounded-[8px] shadow-lg',
    form: 'flex flex-col items-stretch space-y-[12px]',
    input:
      'w-full px-[12px] py-[8px] rounded-[8px] text-[16px] leading-[24px] tracking-[0.75px] focus:outline-none ring-1 ring-blueGray-200 focus:ring-2 focus:ring-blue-300',
    row: 'flex items-center space-x-[12px]',
    label: 'w-[72px] text-right',
  };

  const handleBackdropClicked = () => {
    closeModal();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubjectChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEvent((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleStartDateChanged = (date: Date) => {
    setEvent((prev) => ({
      ...prev,
      activityDate: format(date, 'yyyy-MM-dd'),
      activityDateTime: date,
      durationInMinutes: differenceInMinutes(date, prev.endDateTime),
    }));
  };

  const handleEndDateChanged = (date: Date) => {
    setEvent((prev) => ({
      ...prev,
      endDateTime: date,
      durationInMinutes: differenceInMinutes(prev.activityDateTime, date),
    }));
  };

  const handleLocationChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEvent((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleDescriptionChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEvent((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreating) {
      const result = await createEvent(event);
      if (result.success) {
        closeModal(true);
      }
    } else if (isEditing) {
      const result = await updateEvent(event);
      if (result.success) {
        closeModal(true);
      }
    }
  };

  const handleDelete = async () => {
    const result = await deleteEvent(event);
    if (result.success) {
      closeModal(true);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (modalEvent) {
      setEvent(modalEvent);
    }
  }, [modalEvent]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.backdrop} onClick={handleBackdropClicked}>
        <div className={classes.wrapper} onClick={handleModalClick}>
          {isCreating || isEditing ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <textarea
                className={clsx(classes.input, 'h-[64px]')}
                placeholder="Subject"
                value={event.subject}
                onChange={handleSubjectChanged}
                required
              />

              <div className={classes.row}>
                <p className={classes.label}>Start</p>
                <DatePicker
                  className={clsx(classes.input, 'flex-1')}
                  selected={event.activityDateTime}
                  onChange={handleStartDateChanged}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  maxDate={event.endDateTime}
                />
              </div>

              <div className={classes.row}>
                <p className={classes.label}>End</p>
                <DatePicker
                  className={clsx(classes.input, 'flex-1')}
                  selected={event.endDateTime}
                  onChange={handleEndDateChanged}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={event.activityDateTime}
                />
              </div>

              <input
                type="text"
                className={classes.input}
                placeholder="Location"
                value={event.location}
                onChange={handleLocationChanged}
              />

              <textarea
                className={clsx(classes.input, 'h-[200px]')}
                placeholder="Description"
                onChange={handleDescriptionChanged}
                value={event.description}
              />

              <div className="flex justify-center">
                <Button variant="primary" className="w-[30%]">
                  {isCreating ? 'Create' : 'Update'}
                </Button>
              </div>
            </form>
          ) : (
            <div className={classes.form}>
              <div className={classes.row}>
                {event.subject && <p className="font-semibold flex-1">{event.subject}</p>}
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </div>
              <p>{`${format(event.activityDateTime, 'H:m a, MMM d yyyy')} - ${format(
                event.endDateTime,
                'H:m a, MMM d yyyy',
              )}`}</p>
              {event.description && <p>{event.description}</p>}
              {event.location && <p>{event.location}</p>}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};
