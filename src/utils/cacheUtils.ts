import { storageUtils } from './storageUtils';

////////////////////////////////////////////////////////////
// App
////////////////////////////////////////////////////////////

// 左侧导航
const sidebarStatusKey = 'sidebar_status';
export const getSidebarStatus = () => storageUtils.getLocalItem(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  storageUtils.setLocalItem({
    key: sidebarStatusKey,
    value: sidebarStatus,
  });

// 国际化
const languageKey = 'language';
export const getLanguage = () => storageUtils.getLocalItem(languageKey);
export const setLanguage = (language: string) =>
  storageUtils.setLocalItem({
    key: languageKey,
    value: language,
  });

// 组件大小
const sizeKey = 'size';
export const getSize = () => storageUtils.getLocalItem(sizeKey);
export const setSize = (size: string) =>
  storageUtils.setLocalItem({
    key: sizeKey,
    value: size,
  });
