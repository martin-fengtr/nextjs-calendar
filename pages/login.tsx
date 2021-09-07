import { Login } from 'components/auth';
import { useAuth } from 'hooks/useAuth';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  const { isLoading, token } = useAuth({ redirectUrl: '/' });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return token ? null : <Login />;
};

export default LoginPage;
