import { store } from '/@/store';
import { defineStore } from 'pinia';
import { ISettingsState } from '/#/store';
import { useSetting } from '/@/config';

const settingStore = defineStore({
  id: 'settingStore',
  state: (): ISettingsState => ({
    title: useSetting.Title,
    fixedHeader: useSetting.FixedHeader,
    hiddenSideBar: useSetting.HiddenSideBar,
  }),
  getters: {
    getTitle(): string {
      return this.title;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getHiddenSideBar(): boolean {
      return this.hiddenSideBar;
    },
  },
  actions: {
    CHANGE_SETTING({ key, value }) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    },
    changeSetting(data) {
      this.CHANGE_SETTING(data);
    },
  },
});

export function useSettingStore() {
  return settingStore(store);
}
