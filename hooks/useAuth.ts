import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';

export interface UseAuthProps {
  redirectUrl?: string;
  shouldAuthenticated?: boolean;
}

export interface UseAuthInterface {
  isLoading: boolean;
  token: string;
}

export const useAuth = (props: UseAuthProps): UseAuthInterface => {
  const router = useRouter();
  const { redirectUrl = '/login', shouldAuthenticated } = props;
  const [session, isLoading] = useSession();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if ((shouldAuthenticated && !session) || (!shouldAuthenticated && session)) {
      router.replace(redirectUrl);
    }
  }, [router, session, isLoading, redirectUrl, shouldAuthenticated]);

  return {
    token: (session?.accessToken as string) ?? '',
    isLoading,
  };
};
