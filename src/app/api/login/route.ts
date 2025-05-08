// app/api/login/route.ts

import { applySession } from '@/app/api/session';
import { createEdgeRouter } from 'next-connect';
import { RequestContext } from 'next/dist/server/base-server';
import { NextRequest, NextResponse } from 'next/server';

const edgeRouter = createEdgeRouter<NextRequest, RequestContext>();

edgeRouter.use(applySession).post(async (req, res) => {
  const { username, password } = await req.json();

  try {
    // Send request to external API for authentication
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const { token } = await response.json();

    // Store token in session
    console.log("req: **", req);
    req.session.token = token;
    await new Promise((resolve) => req.session.save(resolve));

    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    return NextResponse.json({ message: 'Error during login' }, { status: 500 });
  }
});

export async function POST(request: NextRequest, ctx: RequestContext) {
  return edgeRouter.run(request, ctx);
}
