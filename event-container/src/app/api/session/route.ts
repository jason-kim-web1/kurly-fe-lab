export async function GET(request: Request) {
  const response = await fetch('https://auth.kurly.com/session', {
    headers: {
      ...request.headers,
      'kurly-auth-dev': 'true',
    },
  });
  const result = await response.json();
  return Response.json(result);
}