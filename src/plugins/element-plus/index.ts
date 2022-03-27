import type { App } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { useAppStore } from '/@/store/modules/app';

export function useElementPlus(app: App<Element>) {
  app.use(ElementPlus, { size: useAppStore().getSize, zIndex: 3000 });
}
