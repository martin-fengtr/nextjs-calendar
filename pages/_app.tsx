import { CalendarProvider } from 'contexts/calendar';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CalendarProvider>
      <Component {...pageProps} />
    </CalendarProvider>
  );
}
export default MyApp;
