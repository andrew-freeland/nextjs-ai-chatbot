import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';
import { NextRequest } from 'next/server';

// This is now the required signature in v5
const handler = (req: NextRequest) => {
  return NextAuth(req, authOptions);
};

export { handler as GET, handler as POST };
