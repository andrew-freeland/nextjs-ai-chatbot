import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';

const handler = NextAuth(authOptions);

export function GET(req: Request) {
  return handler(req);
}

export function POST(req: Request) {
  return handler(req);
}
