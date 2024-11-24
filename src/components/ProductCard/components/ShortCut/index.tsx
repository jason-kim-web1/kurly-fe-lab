import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef, MouseEventHandler } from 'react';

import { CustomStylingProps } from '../../types/common';
import { useProductCardBase } from '../ProductCardBase';
import { ShortCutType, ShortCutTypeEnum } from '../../types/shortcut';
import { Buy } from '../../icons/Buy';
import { Cart } from '../../icons/Cart';
import COLOR from '../../constants/colorset';
import { isNotFunction } from '../../utils/lodash-extends';

type Ref = HTMLButtonElement;

type ShortCutImplProps = CustomStylingProps & {
  shortCutType: ShortCutType;
  onClickShortCut: MouseEventHandler<HTMLButtonElement>;
};

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

const ShortCutTypeMap = new Map([
  [
    ShortCutTypeEnum.enum.cart,
    {
      label: '담기',
      icon: <Cart width={18} height={18} />,
    },
  ],
  [
    ShortCutTypeEnum.enum.detail,
    {
      label: '상세보기',
      icon: null,
    },
  ],
  [
    ShortCutTypeEnum.enum.purchase,
    {
      label: '바로구매',
      icon: <Buy width={18} height={18} />,
    },
  ],
  [
    ShortCutTypeEnum.enum.restock_notification,
    {
      label: '재입고알림',
      icon: <Cart width={18} height={18} />,
    },
  ],
]);

const ShortCutImpl = forwardRef<Ref, ShortCutImplProps>(({ shortCutType, onClickShortCut, className, style }, ref) => {
  const target = ShortCutTypeMap.get(shortCutType);
  if (!target) {
    return null;
  }
  const { icon, label } = target;
  return (
    <button ref={ref} type="button" onClick={onClickShortCut} className={clsx(rootStyle, className)} style={style}>
      {icon}
      <span className={labelStyle}>{label}</span>
    </button>
  );
});

const ShortCut = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product, onClickShortCut } = useProductCardBase();
  const { shortCutType } = product;

  const handleClickShortCut: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNotFunction(onClickShortCut)) {
      return;
    }
    onClickShortCut(product, shortCutType);
  };

  if (!shortCutType) {
    return null;
  }
  return (
    <ShortCutImpl
      ref={ref}
      className={className}
      shortCutType={shortCutType}
      onClickShortCut={handleClickShortCut}
      style={style}
    />
  );
});

ShortCutImpl.displayName = 'ShortCutImpl';
ShortCut.displayName = 'ShortCut';

export { ShortCut };
