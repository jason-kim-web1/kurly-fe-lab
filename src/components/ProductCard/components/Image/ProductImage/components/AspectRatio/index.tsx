import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface AspectRatioProps {
  ratio: number;
}

export const AspectRatio = ({ ratio, children }: PropsWithChildren<AspectRatioProps>) => {
  const paddingBottom = `${100 / ratio}%`;
  return (
    <Root style={{ paddingBottom }}>
      <Content>{children}</Content>
    </Root>
  );
};
