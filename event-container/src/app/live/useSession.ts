import { useState, useEffect } from 'react';

export default function useSession() {
  const [session, setSession] = useState({
    hasSession: false,
    isGuest: true,
    memberId: '',
  });

  useEffect(() => {
    fetch('/api/session', {
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((result) => {
      const { data } = result;
      if (!data) return;
      const { isGuest, memberId } = data;
      setSession({
        hasSession: true,
        isGuest,
        memberId,
      });
    });
  }, []);

  return { session };
}
