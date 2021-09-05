export interface Event {
  id?: string;
  subject: string;
  location?: string;
  description: string;
  activityDate: string;
  activityDateTime: Date;
  durationInMinutes: number;
  endDateTime: Date;
}
