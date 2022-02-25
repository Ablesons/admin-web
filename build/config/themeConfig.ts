/**
 * @Description: 样式、主题配置
 * @Author: Ableson
 * @Date: 2022/2/21 15:32
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 15:32
 */
// 默认颜色
export const primaryColor = '#0960bd';

// 默认主题
export const darkMode = 'light';

// 主题类型
export type ThemeMode = 'dark' | 'light';

// 一个解决临时检查的方法类型
type Fn = (...arg: any) => any;

// Vite生成颜色组的方法参数，颜色这一块有点深奥了，不做细的研究，感兴趣的同学自己看看源码吧
export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}
