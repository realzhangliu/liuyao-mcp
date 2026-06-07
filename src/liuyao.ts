//六爻排盘
//author: zhangliu
//email: 1484710120@qq.com

import * as Lunar from "lunar";

//起卦
export function Liuyao(param: {
  coins?: number[];
  bagua?: [number, number, number];
}): string {
  if (param.coins) {
    return fromCoins(param.coins);
  } else if (param.bagua) {
    return fromBagua(param.bagua);
  }
  return "";
}

//八卦
function fromBagua(bagua: [number, number, number]): string {
  return "";
}

//摇钱
function fromCoins(yaos: number[]): string {
  //6789
  return "";
}

//起卦
class liuyao {
  //生成六爻排盘
}
