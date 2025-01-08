'use client';

export default function SessionButton() {
  return (
    <button type="button" onClick={async (e) => {
      try {
        const result = await fetch(
          // '/api/session',
          `https://auth.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/session`,
          {
            credentials: 'include',
          }
        ).then(response => response.json());

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }}>
      Request session
    </button>
  );
}