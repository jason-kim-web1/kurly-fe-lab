import { useState, useEffect } from 'react';
import { getAuthApiUrl } from '../util';

export default function useSession() {
  const [session, setSession] = useState({
    hasSession: false,
    isGuest: true,
    memberId: '',
  });

  useEffect(() => {
    fetch(`${getAuthApiUrl()}/session`, {
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
