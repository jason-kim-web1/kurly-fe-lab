import { useState, useRef, useLayoutEffect } from 'react';

const TIMEOUT_SECONDS = 200;

export default function useWindowResize() {
  const timerRef = useRef(null);
  const [isPIP, setIsPIP] = useState(false);

  function onWindowResize() {
    if (timerRef.current) return;
    timerRef.current = window.setTimeout(() => {
      if (!isPIP && window.innerWidth < 320) setIsPIP(true);
      else if (isPIP && window.innerWidth >= 320) setIsPIP(false);
      timerRef.current = null;
    }, TIMEOUT_SECONDS);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => {
      timerRef.current = null;
      window.removeEventListener('resize', onWindowResize);
    }
  }, []);

  return { isPIP };
}