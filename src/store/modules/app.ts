import { defineStore } from 'pinia';
import { store } from '/@/store';
import {
  getLanguage,
  getSidebarStatus,
  getSize,
  setLanguage,
  setSidebarStatus,
  setSize,
} from '/@/utils/cacheUtils';
import { getCssVar, setCssVar } from '/@/utils/cssUtils';

/**
 * 定义设备枚举类型
 */
export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    menuBg: string;
    menuText: string;
    menuActiveText: string;
    // withoutAnimation: boolean;
  };
  language: string;
  size: string;
}

const appStore = defineStore({
  id: 'appStore',
  state: (): IAppState => ({
    device: DeviceType.Desktop,
    sidebar: {
      opened: getSidebarStatus() !== 'closed',
      menuBg: getCssVar('--menuBg'),
      menuText: getCssVar('--menuText'),
      menuActiveText: getCssVar('--menuActiveText'),
    },
    language: getLanguage(),
    size: getSize(),
  }),
  getters: {
    getSidebarOpened(): boolean {
      return this.sidebar.opened;
    },
    getLanguage(): string {
      return this.language;
    },
    getSize(): string {
      const size = getSize() || 'mini';
      document.getElementsByTagName('body')[0].className = `tw-size-${size}`;
      return size;
    },
    getVxeSize(): Nullable<string> {
      let size: Nullable<string> = this.getSize;
      size = size === 'large' ? null : size;
      return size;
    },
  },
  actions: {
    setDevice(device: DeviceType) {
      this.device = device;
    },

    /**
     * 切换左侧菜单折叠状态
     */
    setToggleSideBar(): void {
      this.sidebar.opened = !this.sidebar.opened;

      if (this.sidebar.opened) {
        setSidebarStatus('opened');
      } else {
        setSidebarStatus('closed');
      }
    },
    /**
     * 折叠左侧菜单
     */
    setSidebarClosed() {
      this.sidebar.opened = false;

      if (this.sidebar.opened) {
        setSidebarStatus('opened');
      } else {
        setSidebarStatus('closed');
      }
    },

    /**
     * 左侧菜单背景色
     * @param color
     */
    setSidebarMenuBg(color: string) {
      this.sidebar.menuBg = color;
      setCssVar('--menuBg', color);
    },

    /**
     * 左侧菜单字体颜色
     * @param color
     */
    setSidebarMenuText(color: string) {
      this.sidebar.menuText = color;
      setCssVar('--menuText', color);
    },

    /**
     * 左侧菜单选中字体颜色
     * @param color
     */
    setSidebarMenuActiveText(color: string) {
      this.sidebar.menuActiveText = color;
      setCssVar('--menuActiveText', color);
    },

    setLanguage(language: string): void {
      this.language = language;

      setLanguage(language);
    },
    setSize(size: string): void {
      this.size = size;
      setSize(this.size);
    },
  },
});

export function useAppStore() {
  return appStore(store);
}
