/**
 * @Description: Introduces component library styles on demand.
 * @PageHome: https://github.com/anncwb/vite-plugin-style-import
 * @Author: Ableson
 * @Date: 2022/2/21 15:03
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 15:03
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: 'vxe-table',
        esModule: true,
        resolveComponent: name => `vxe-table/es/${name}`,
        resolveStyle: name => `vxe-table/es/${name}/style.css`,
      },
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveComponent: name => `element-plus/lib/${name}`,
        resolveStyle: name => `element-plus/lib/theme-chalk/${name}.css`,
      },
    ],
  });
}
