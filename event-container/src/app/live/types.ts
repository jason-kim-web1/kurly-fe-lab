export type GripEvent = {
  value: {
    data: {
      productId: string;
      detailUrl: string;
    };
  };
};

export type GripcloudLoadProps = {
  channelId: string | string[];
  type: number;
  session: {
    id: string;
    nick: string;
  } | null;
  custom: {
    couponBoxCount: number;
    events: {
      /**
       * @info 이전 코드 정보나 사용처 정보
       * - requiredLogin: 로그인이 필요한 경우 실행 / 기존 mini.on('needLogin') / 로그인 여부체크를 위해 session.nick === ''를 비교
       * - clickClose: 닫기 버튼 클릭시 실행 / 기존 mini.on('close') / custom callback 비어있음
       * - clickTipImage: 방송팁 내부 상세 이미지 클릭 시 실행 / 기존 mini.on('tipImageLink') / custom callback 비어있음
       * - clickNoticeLink: 공지사항 내부 링크를 클릭할 때 실행 / 기존 mini.on('noticeLink') / custom callback 비어있음
       * - clickShare: 공유하기 버튼을 클릭할 때 실행 / 기존 mini.on('share') / custom callback 비어있음
       * - clickProduct: 특정 상품을 클릭할 때 실행 / 기존 mini.on('product') / handleClickProduct 함수 실행
       * - clickPinProduct: 고정된 상품(대표상품)을 클릭할 때 실행 / 기존 mini.on('activatedProduct') / handleClickProduct 함수 실행
       * - clickCouponBox: 쿠폰함 버튼 클릭시 실행 / 기존 mini.on('couponBox') / 쿼리스트링을 통해 couponCode가 있는 경우에만 실행 / 인스턴스 생성시 해당 이벤트를 등록하지 않아야만 쿠폰 아이콘이 비활성 됨
       * - [key: string]: unknown: 동적으로 추가되는 이벤트를 위하여 시그니쳐 추가
       */
      requiredLogin?: () => void;
      clickClose?: (e: GripEvent) => void;
      clickTipImage?: (e: GripEvent) => void;
      clickNoticeLink?: (e: GripEvent) => void;
      clickShare?: () => void;
      clickProduct?: (e: GripEvent) => void;
      clickPinProduct?: (e: GripEvent) => void;
      clickCouponBox?: () => void;
      [key: string]: unknown;
    };
  };
};

export type GripcloudLoadInstance = {
  remove: () => void;
  set: (e: unknown, t: unknown) => void;
};
