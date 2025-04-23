import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return await NextAuth(req, authOptions) as Response;
}

export async function POST(req: NextRequest) {
  return await NextAuth(req, authOptions) as Response;
}
