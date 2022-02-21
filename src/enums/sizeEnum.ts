/**
 * @Description: 组件相关枚举
 * @Author: Ableson
 * @Date: 2022/2/21 17:02
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 17:02
 */
// antd组件中组件大小
export enum SizeEnum {
  DEFAULT = 'default',
  SMALL = 'small',
  LARGE = 'large',
}

// 这个数字没地方用
export enum SizeNumberEnum {
  DEFAULT = 48,
  SMALL = 16,
  LARGE = 64,
}

export const sizeMap: Map<SizeEnum, SizeNumberEnum> = (() => {
  const map = new Map<SizeEnum, SizeNumberEnum>();
  map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
  map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
  map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
  return map;
})();
