import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useLayoutSetting } from '/@/hooks/setting';
import elementVariables from '/@/style/element-variables.scss';

export interface ISettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
  autocomplete: string; // 自动完成功能
  table: {
    align: string; // 表格配置
  };
  dialogForm: {
    width: string;
  };
}

// 配置
const settingStore = defineStore({
  id: 'settingStore',
  state: (): ISettingsState => ({
    theme: elementVariables.theme,
    fixedHeader: useLayoutSetting.fixedHeader,
    showSettings: useLayoutSetting.showSettings,
    showTagsView: useLayoutSetting.showTagsView,
    showSidebarLogo: useLayoutSetting.showSidebarLogo,
    sidebarTextTheme: useLayoutSetting.sidebarTextTheme,
    autocomplete: 'off', // 自动完成功能
    table: {
      align: 'center', // 表格配置
    },
    dialogForm: {
      width: '500',
    },
  }),
  getters: {
    getTheme(): string {
      return this.theme;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getShowSettings(): boolean {
      return this.showSettings;
    },
    getShowTagsView(): boolean {
      return this.showTagsView;
    },
    getShowSidebarLogo(): boolean {
      return this.showSidebarLogo;
    },
    getSidebarTextTheme(): boolean {
      return this.sidebarTextTheme;
    },
    getAutocomplete(): string {
      return this.autocomplete;
    },
    getTable(): object {
      return this.table;
    },
    getFormWidth(): string {
      return this.dialogForm.width;
    },
  },
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader;
    },
    setShowSettings(showSettings: boolean) {
      this.showSettings = showSettings;
    },
    setShowTagsView(showTagsView: boolean) {
      this.showTagsView = showTagsView;
    },
    setShowSidebarLogo(showSidebarLogo: boolean) {
      this.showSidebarLogo = showSidebarLogo;
    },
    setSidebarTextTheme(sidebarTextTheme: boolean) {
      this.sidebarTextTheme = sidebarTextTheme;
    },
    setAutocomplete(autocomplete: string) {
      this.autocomplete = autocomplete;
    },
    setTable(table: object) {
      Object.assign(this.table, table);
    },
    setFormWidth(width: string) {
      this.dialogForm.width = width;
    },
  },
});

export function useSettingStore() {
  return settingStore(store);
}
