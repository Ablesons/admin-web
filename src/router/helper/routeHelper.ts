/*
 * @Description:
 * @Author: DHL
 * @Date: 2022-01-05 21:41:06
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-09 21:10:33
 */

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;
let dynamicPagesModules: Record<string, () => Promise<Recordable>>;

/**
 * 动态导入路由组件
 * 识别路径：【views】目录下【.vue/.tsx】文件
 * @param component 组件url
 */
export function dynamicImport(component: string) {
  if (!component) {
    console.warn('请正确配置组件');
    return;
  }

  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  dynamicPagesModules = dynamicPagesModules || import.meta.glob('../../pages/**/*.{vue,tsx}');

  // [src/views]
  const viewsKeys = Object.keys(dynamicViewsModules);
  const viewsMatchKeys = viewsKeys.filter(key => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });

  if (viewsMatchKeys?.length === 1) {
    const matchKey = viewsMatchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (viewsMatchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    return;
  }

  // [src/pages]
  const pagesKeys = Object.keys(dynamicPagesModules);
  const pagesMatchKeys = pagesKeys.filter(key => {
    const k = key.replace('../../pages', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });

  if (pagesMatchKeys?.length === 1) {
    const matchKey = pagesMatchKeys[0];
    return dynamicPagesModules[matchKey];
  } else if (pagesMatchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
    return;
  } else {
    console.warn(
      '在[src/pages][src/views]下找不到`' +
        component +
        '.vue` 或 `' +
        component +
        '.tsx`, 请自行创建!'
    );
    // return EXCEPTION_COMPONENT
    return;
  }
}
