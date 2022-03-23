import { store } from '/@/store';
import { defineStore } from 'pinia';

const appStore = defineStore({
  id: 'appStore',
});

export function useAppStore() {
  return appStore(store);
}
