import { SVGAttributes } from 'react';

import COLOR from '../../constants/colorset';

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'stroke'>;

const Buy = ({ width = 18, height = 18, stroke = COLOR.kurlyGray800 }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
      <rect x="2.30078" y="3.70001" width="13.5" height="10.5" rx="1" stroke={stroke} />
      <path d="M1.80078 6.66058H16.1854" stroke={stroke} strokeLinejoin="round" />
      <path d="M4.49609 11.6H7.49609" stroke={stroke} strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
};

export { Buy };
