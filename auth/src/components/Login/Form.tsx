'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div>
        <label>아이디</label>
        <input type="text" placeholder="ID" onChange={(e) => setID(e.target.value)} />
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="button" onClick={async (e) => {
          try {
            const response = await fetch(
              // `/api/login`,
              `https://auth.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/login?addAddress=true`,
              {
                method: 'POST',
                headers: {
                  'accept': 'application/json, text/plain, */*',
                  'content-type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                  id,
                  password,
                  clientCaptcha: false,
                  recaptchaToken: '',
                  recaptchaSiteKey: '',
                  userAgent: window.navigator.userAgent,
                }),
              }
            );
            const { data } = await response.json();

            if (!data || !data.accountStatus) {
              throw new Error('응답 데이터가 없습니다.');
            }

            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}>
          Login
        </button>
      </div>
    </form>
  );
}
