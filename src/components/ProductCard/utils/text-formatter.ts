import { css } from '@emotion/react';

// 말줄임 처리 CSS
export const multiMaxLineText = (line = 2) => css`
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
`;
