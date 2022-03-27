import type { App } from 'vue';
// element-plus 组件
import { useElementPlus } from '/@/plugins/element-plus';
// 表格
import { useTable } from '/@/plugins/vxe-table';
// 自定义 Icon 组件
import { IconOffLine, IconOnline, IconSvg } from '/@/components/Icon';
import { TwLayout, TwToolbar, TwTable, TwDialog, TwDic } from '/@/components/tw';

export function setupPlugins(app: App<Element>) {
  app.use(useElementPlus);
  app.use(useTable);
  app.component('IconSvg', IconSvg);
  app.component('IconOffLine', IconOffLine);
  app.component('IconOnline', IconOnline);
  app.component('TwLayout', TwLayout);
  app.component('TwSearch', TwToolbar);
  app.component('TwTable', TwTable);
  app.component('TwDialog', TwDialog);
  // 数据字典
  app.component('TwDic', TwDic);
}
