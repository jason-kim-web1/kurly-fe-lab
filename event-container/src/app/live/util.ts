import { GripEvent, GripcloudLoadProps, GripcloudLoadInstance } from './types';

function isWebView() {
  const texts = window.navigator.userAgent.match(/Kurly\/(\d+\.\d+\.\d+)/);
  return !!texts;
}

export function getAuthApiUrl() {
  if (process.env.NEXT_PUBLIC_SERVICE_ENV) {
    return `https://auth.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com`;
  }
  return `https://auth.kurly.com`;
}

function getKurlyURL() {
  if (process.env.NEXT_PUBLIC_SERVICE_ENV) {
    return `https://www.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/`;
  }
  return `https://www.kurly.com/`;
}

function getKurlyEventURL() {
  if (process.env.NEXT_PUBLIC_SERVICE_ENV) {
    return `https://event.${process.env.NEXT_PUBLIC_SERVICE_ENV}.kurly.com/`;
  }
  return `https://event.kurly.com/`;
}

const objAppURL: Record<string, string> = {
  goods: 'product?no=',
  categories: 'category?no=',
  collections: 'collection?code=',
};

function convertURL(url: string, webview: boolean) {
  let rtnURL = url;

  try {
    const chkURL = new URL(rtnURL);
    const site = new URLSearchParams(chkURL.search).get('site') ?? 'market';
    const match = chkURL.pathname.match(/\/(goods|categories|collections)\/([^?]+)/i);

    if (match !== null) {
      const kind = match[1];
      const code = match[2];

      if (webview) {
        rtnURL = `kurly://${objAppURL[kind] + code}&`;
      } else {
        rtnURL = `/${kind}/${code}?`;
      }
      rtnURL += `site=${site}`;
    }
  } catch (error) {
    console.error('URL 매치 오류!', rtnURL);
  }

  // 이벤트 페이지 주소는 open딥링크로 연결
  if (
    webview &&
    (rtnURL.indexOf('htmid') > -1 || rtnURL.indexOf('partners') > -1 || rtnURL.indexOf('mypage/coupon') > -1)
  ) {
    // TODO : 임시로 쿠폰 딥링크 처리 - 나중에 리팩토링 할것!
    const matchURL = rtnURL.match(/coupon\?code=([^&]+)/);
    if (rtnURL.indexOf('mypage/coupon') > -1 && matchURL !== null && matchURL.length === 2) {
      rtnURL = `kurly://mykurly/coupon?code=${matchURL[1]}&couponNo=${matchURL[1]}`;
    } else {
      rtnURL = `kurly://open?url=${encodeURIComponent(rtnURL)}`;
    }
  }

  return rtnURL;
}

function onRequiredLogin(isGuest) {
  return () => {
    if (isGuest && confirm('로그인이 필요합니다.')) {
      const returnURL = encodeURIComponent(location.href);
      const link = isWebView()
        ? 'kurly://login'
        : `${getKurlyURL()}member/login?return_url=${returnURL}`;
      location.href = link;
    }
  };
}

function onClickShare() {
  const tmpTextarea = document.createElement('textarea');
  document.body.appendChild(tmpTextarea);
  tmpTextarea.value = location.href;
  tmpTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tmpTextarea);
  alert('URL이 복사 되었습니다.');
}

const handleClickProductList = (type: 'goods' | 'categories', id: string) => {
  location.href = isWebView() ? `kurly://product?no=${id}` : `${getKurlyURL()}${type}/${id}`;
};

function onClickProduct(e: GripEvent) {
  const detailUrl = e?.value?.data?.detailUrl;
  const id = e?.value?.data?.productId;
  if (!id) return;

  if (detailUrl.includes('goods')) {
    return handleClickProductList('goods', id);
  }
  
  if (detailUrl.includes('categories')) {
    return handleClickProductList('categories', id);
  }

  console.error('상세 URL이 없습니다.');
}

function onClickPinProduct(e: GripEvent) {
  const productId = e?.value?.data?.productId;
  return handleClickProductList('goods', productId);
}

declare const Gripcloud: {
  PLAYER_TYPE: {
    USER: number;
    MANAGER: number;
  };
  TYPE: {
    BANNER_WIDGET: number;
    HOME: number;
    LIVE_PLAYER: number;
    LIVE_WIDGET: number;
    SHORTS_PLAYER: number;
    SHORTS_WIDGET: number;
  };
  load: ({}: GripcloudLoadProps) => GripcloudLoadInstance;
  destroy: () => void /** 해당 메서드는 동작하지 않음 / 호환성 유지를 위하여 interface만 Grip SDK에 남아있음 - Grip 답변 */;
};

function onClickCouponBox() {
  const couponCode = encodeURI(new URLSearchParams(location.search).get('couponCode')?.trim() ?? '');
  if (!couponCode) return;
  const urlCouponDown = `${getKurlyURL()}/mypage/coupon?code=${couponCode}&couponNo=${couponCode}`;
  location.href = convertURL(urlCouponDown, isWebView());
}

export function initGrip({ isGuest, memberId }) {
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const couponBoxCount = params.couponCode?.length > 0 ? 1 : 0;
  const session = memberId ? { id: memberId, nick: memberId } : null;
  const gripcloudProps: GripcloudLoadProps = {
    channelId: params.channelId || '',
    type: 4,
    session,
    custom: {
      couponBoxCount,
      events: {
        requiredLogin: onRequiredLogin(isGuest),
        clickClose: console.log,
        clickTipImage: console.log,
        clickNoticeLink: console.log,
        clickShare: onClickShare,
        clickProduct: onClickProduct,
        clickPinProduct: onClickPinProduct,
      },
    },
  };
  if (couponBoxCount === 1) {
    gripcloudProps.custom.events.clickCouponBox = onClickCouponBox;
  }

  if (Gripcloud) {
    return Gripcloud.load(gripcloudProps);
  }

  console.log('grip.min.js 로딩 여부를 확인하세요.');
  return null;
}