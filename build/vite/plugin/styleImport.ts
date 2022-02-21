/**
 * @Description: Introduces component library styles on demand.
 * @PageHome: https://github.com/anncwb/vite-plugin-style-import
 * @Author: Ableson
 * @Date: 2022/2/21 15:03
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 15:03
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin(_isBuild: boolean) {
  console.log(_isBuild);
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: name => `element-plus/lib/theme-chalk/${name}.css`,
      },
    ],
  });
}
