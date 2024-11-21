import { cloneElement, isValidElement, PropsWithChildren, ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  onInViewStateChange: (visible: boolean) => void;
};

const Impression = ({ onInViewStateChange, children }: PropsWithChildren<Props>) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    onInViewStateChange(inView);
  }, [inView, onInViewStateChange]);

  if (!isValidElement(children)) {
    return null;
  }

  // TOFIX: as casting 제거
  return cloneElement(children as ReactElement, {
    ref,
  });
};

export { Impression };
