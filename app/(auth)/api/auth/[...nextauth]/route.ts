import NextAuth from 'next-auth';
import { authOptions } from '@/app/(auth)/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return NextAuth(req, authOptions); // ✅ return directly
}

export async function POST(req: NextRequest) {
  return NextAuth(req, authOptions); // ✅ return directly
}
