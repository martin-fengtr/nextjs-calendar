import { Main } from 'components/main';
import { useAuth } from 'hooks/useAuth';
import type { NextPage } from 'next';

const MainPage: NextPage = () => {
  const { token, isLoading } = useAuth({ redirectUrl: '/login', shouldAuthenticated: true });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return token ? <Main /> : null;
};

export default MainPage;
