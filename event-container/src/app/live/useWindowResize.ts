import { useState, useRef, useLayoutEffect } from 'react';

const TIMEOUT_SEC = 200;

export default function useWindowResize() {
  const timerRef = useRef(null);
  const [isPIP, setIsPIP] = useState(false);

  function onWindowResize() {
    if (timerRef.current) return;
    timerRef.current = window.setTimeout(() => {
      setIsPIP(window.innerWidth < 320);
      timerRef.current = null;
    }, TIMEOUT_SEC);
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