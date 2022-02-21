/**
 * @Description: Vite plugin for website theme color switching
 * @PageHome: https://github.com/anncwb/vite-plugin-theme
 * @Author: Ableson
 * @Date: 2022/2/21 15:29
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 15:29
 */
import type { Plugin } from 'vite';
// import path from 'path';
import { viteThemePlugin } from 'vite-plugin-theme';
// import { getThemeColors, generateColors } from '../../config/themeConfig';

export function configThemePlugin(isBuild: boolean): Plugin[] {
  console.log(isBuild);
  const plugin = [
    viteThemePlugin({
      // 匹配需要修改的颜色
      colorVariables: [],
    }),
  ];

  return plugin as unknown as Plugin[];
}
