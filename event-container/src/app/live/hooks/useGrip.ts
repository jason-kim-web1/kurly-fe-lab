import { RefObject, useEffect, useRef } from 'react';
import { initGrip } from '../util';

import { GripcloudLoadInstance } from '../types';

export default function useGrip({ isGuest, memberId }) {
  const player: RefObject<GripcloudLoadInstance> = useRef(null);

  useEffect(() => {
    player.current = initGrip({ isGuest, memberId });
    return () => {
      player.current.remove();
    }
  }, [isGuest, memberId]);  
}
