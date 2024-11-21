import { css } from '@emotion/css';
import clsx from 'clsx';
import { isFunction } from 'lodash';
import { forwardRef, MouseEventHandler } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import { Buy } from '@shared/components/icons/Buy';
import { Cart } from '@shared/components/icons/Cart';
import COLOR from '@shared/constants/colorset';

type Ref = HTMLButtonElement;

const rootStyle = css`
  width: 100%;
  // NOTE: 디자인 가이드 상으로는 상하 여백이 6px 이지만, 상하 테두리 각 1px 제외한 5px 로 설정
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
`;

const labelStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const ShortCutTypeMap = {
  cart: {
    label: '담기',
    icon: <Cart width={18} height={18} />,
  },
  detail: {
    label: '상세보기',
    icon: null,
  },
  purchase: {
    label: '바로구매',
    icon: <Buy width={18} height={18} />,
  },
  restock_notification: {
    label: '재입고알림',
    icon: <Cart width={18} height={18} />,
  }
}

const ShortCut = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product, onClickShortCut } = useProductCardBase();
  const { shortCutType } = product;
  if (!shortCutType) return null;
  const target = ShortCutTypeMap[shortCutType];
  if (!target) return null;
  
  const { icon, label } = target;
  const handleClickShortCut: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFunction(onClickShortCut)) onClickShortCut(product, shortCutType);
  };

  return (
    <button ref={ref} type="button" onClick={handleClickShortCut} className={clsx(rootStyle, className)} style={style}>
      {icon}
      <span className={labelStyle}>{label}</span>
    </button>
  );
});

ShortCut.displayName = 'ShortCut';

export { ShortCut };
