/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default typeof NextAuth === 'function' &&
  NextAuth({
    providers: [
      Providers.Credentials({
        async authorize(credentials) {
          const body = new URLSearchParams();
          body.append('email', credentials.email);
          body.append('password', credentials.password);

          const res = await fetch(`${process.env.API_URL}/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
          });
          const user = await res.json();

          if (user && user.token) {
            return user.token;
          }

          return null;
        },
      }),
    ],
    callbacks: {
      async jwt(token: any, user: any) {
        if (user) {
          token.user = user;
        }
        return token;
      },
      async session(session: any, token: any) {
        session.accessToken = token.user;
        return session;
      },
    },
  });
