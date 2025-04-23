import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

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

// ✅ This line is what your other files expect when calling `auth()`
export const { auth } = NextAuth(authOptions);
