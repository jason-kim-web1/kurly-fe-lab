import { cookies } from 'next/headers';

async function requestSession(request: Request) {
  const cookieStore = await cookies();
  return await fetch(
    `https://auth.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/session`,
    {
      headers: {
        ...request.headers,
        'kurly-auth-dev': 'true',
      },
    }
  );
}

export async function GET(request: Request) {
  try {
    return await requestSession(request);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
