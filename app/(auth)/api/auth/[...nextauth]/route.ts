import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';

const handler = NextAuth(authOptions);

const handlers = {
  GET: handler,
  POST: handler,
};

export { handlers as GET, handlers as POST };
