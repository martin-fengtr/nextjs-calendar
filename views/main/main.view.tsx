import { FunctionComponent } from 'react';
import { Header } from '@components/header';
import { Calendar } from './partials';

export interface MainViewProps {
  children?: never;
}

export const MainView: FunctionComponent<MainViewProps> = () => {
  return (
    <div className="h-full flex flex-col items-stretch">
      <Header viewMode="month" startDate={new Date(2021, 7, 10)} endDate={new Date(2021, 7, 20)} />

      <div className="flex flex-1">
        <div className="flex-1"></div>
        <Calendar viewMode="month" startDate={new Date()} />
      </div>
    </div>
  );
};
