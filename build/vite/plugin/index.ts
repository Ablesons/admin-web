/**
 * @Description: Vite自定义插件
 * @Author: Ableson
 * @Date: 2022/2/19 11:34
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/19 11:34
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import windiCSS from 'vite-plugin-windicss';
import { configHtmlPlugin } from './html';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    // VITE_USE_MOCK,
    VITE_LEGACY,
    // VITE_BUILD_COMPRESS,
    // VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
