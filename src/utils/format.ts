import BigNumber from 'bignumber.js';

export const toFixed = (num?: BigNumber.Value) => {
  if (num !== 0 && !num) return '**';

  return new BigNumber(num).toFixed(2, 1);
};

//获取地址栏url后的参数值
export function getUrlParam(key: string) {
  const { href } = window.location;
  const url = href.split('?');
  if (url.length <= 1) {
    return '';
  }
  const params = url[1].split('&');

  for (let i = 0; i < params.length; i += 1) {
    const param = params[i].split('=');
    if (key === param[0]) {
      return param[1];
    }
  }
}

export function desensitize(str: string = '', start: number = 8, end = 8) {
  const startStr = str.substring(0, start);
  const endStr = str.substring(str.length - end, str.length);

  return `${startStr}...${endStr}`;
}
