async function requestLogin(request: Request) {
  const {
    id,
    password,
    clientCaptcha,
    recaptchaToken,
    recaptchaSiteKey,
  } = await request.json();

  return await fetch(
    `https://auth.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/login?addAddress=true`,
    {
      headers: {
        ...request.headers,
        'kurly-auth-dev': 'true',
      },
      body: JSON.stringify({ id, password, clientCaptcha, recaptchaToken, recaptchaSiteKey }),
      method: 'POST'
    }
  );
}

export async function POST(request: Request) {
  try {
    const response = await requestLogin(request);
    return response;
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
