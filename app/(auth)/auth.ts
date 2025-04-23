import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Bypass Login',
      credentials: {},
      async authorize() {
        return {
          id: 'guest',
          name: 'Guest User',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
};
