// 引入样式
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import '/@/design/index.less';
import 'virtual:windi-utilities.css';
// 注册雪碧图标
import 'virtual:svg-icons-register';
import { createApp } from 'vue';
import App from './App.vue';

async function startCreateVue() {
  createApp(App).mount('#app');
}

startCreateVue().then();
