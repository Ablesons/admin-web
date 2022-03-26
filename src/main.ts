// 引入样式
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// 注册SVG雪碧图标
import 'virtual:svg-icons-register';
// 导入公共样式
import '/@/style/index.scss';
// 导入字体图标
import '/@/assets/iconfont/iconfont.js';
import '/@/assets/iconfont/iconfont.css';
// 鼠标右键
import 'v-contextmenu/dist/themes/default.css';
import { createApp } from 'vue';
import App from './App.vue';
import { MotionPlugin } from '@vueuse/motion';
import { setupComponents } from '/@/plugins';
import { setupRouter } from './router';
import { setupStore } from '/@/store';

async function setupVue() {
  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  setupComponents(app);

  app.use(MotionPlugin).mount('#app');
}

setupVue().then();
