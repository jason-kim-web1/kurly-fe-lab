'use client';

import Script from 'next/script';

import useWindowResize from './useWindowResize';
import useSession from './useSession';
import useGrip from './useGrip';

const EmbededGrip = ({ isPIP }) => {
  return (
    <div id="embed" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      minWidth: isPIP ? 'unset' : '320px',
      margin: '0 auto',
      width: '100vw',
    }} />
  );
};

export default function Page() {
  const { isPIP } = useWindowResize();
  const { session } = useSession();
  useGrip(session);

  return (
    <>
      <Script type="text/javascript" src="/grip/grip.min.js" strategy="beforeInteractive" />
      <EmbededGrip isPIP={isPIP} />
    </>
  );
}
