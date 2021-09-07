import { CalendarProvider } from 'contexts/calendar';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Calendar Test</title>
        <meta name="description" content="Calendar/Events management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider session={pageProps.session}>
        <CalendarProvider>
          <div className="min-h-screen h-screen">
            <main className="relative w-full h-full">
              <Component {...pageProps} />
            </main>
          </div>
        </CalendarProvider>
      </Provider>
    </>
  );
}
export default MyApp;
