/* eslint-disable @typescript-eslint/no-explicit-any */
import format from 'date-fns/format';
import isEqual from 'date-fns/isEqual';
import parseISO from 'date-fns/parseISO';
import { Event } from 'models/Event';
import useSWR from 'swr';

export interface UseEventsInterface {
  isLoading: boolean;
  events: Event[];
  createEvent: (event: Event) => Promise<any>;
  updateEvent: (event: Event) => Promise<any>;
  deleteEvent: (event: Event) => Promise<any>;
}

const fetcher = async (url: string, method = 'GET', body: any = null): Promise<any> =>
  fetch(`/api/${url}`, { method, body }).then((res) => res.json());

export const useEvents = (): UseEventsInterface => {
  const { data, error } = useSWR('events', fetcher);

  const events: Event[] = (data?.records ?? [])
    .map((item: any) => {
      const {
        id,
        subject,
        location,
        description,
        activity_date: activityDate,
        activity_date_time,
        duration_in_minutes: durationInMinutes,
        end_date_time,
      } = item;

      return {
        id,
        subject,
        location,
        description,
        activityDate,
        activityDateTime: parseISO(activity_date_time),
        endDateTime: parseISO(end_date_time),
        durationInMinutes,
      } as Event;
    })
    .reduce((acc: Event[], current: Event) => {
      if (acc.find((item) => isEqual(item.activityDateTime, current.activityDateTime))) {
        return acc;
      } else {
        return [...acc, current];
      }
    }, []);

  const getParams = (event: Event): URLSearchParams => {
    const body = new URLSearchParams();
    body.append('activity_date_time', format(event.activityDateTime, `yyyy-MM-dd'T'HH:mm:ss`));
    body.append('duration_in_minutes', event.durationInMinutes.toString());
    body.append('subject', event.subject);
    body.append('description', event.description);
    body.append('location', event.location ?? '');
    return body;
  };

  return {
    isLoading: !events && !error,
    events,
    createEvent: (event: Event): Promise<any> => fetcher('events', 'POST', getParams(event)),
    updateEvent: (event: Event): Promise<any> => fetcher(`events/${event.id}`, 'PATCH', getParams(event)),
    deleteEvent: (event: Event): Promise<any> => fetcher(`events/${event.id}`, 'DELETE'),
  };
};
