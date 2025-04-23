import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';

const handler = NextAuth(authOptions);

// This is correct for App Router in NextAuth v5+
export const GET = handler;
export const POST = handler;
