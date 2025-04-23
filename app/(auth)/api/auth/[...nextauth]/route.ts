import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const response = await NextAuth(req, authOptions);
  if (response instanceof Response) return response;
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const response = await NextAuth(req, authOptions);
  if (response instanceof Response) return response;
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
