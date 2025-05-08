// app/api/login/route.ts
import { NextResponse } from 'next/server';
import http from '@/lib/http.service';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const res = await http.post('/auth/login', { username, password });

    return NextResponse.json(res.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ error: message }, { status });
  }
}
