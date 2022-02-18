// 引入样式
// import 'virtual:windi-base.css';
// import 'virtual:windi-components.css';
// import 'virtual:windi-utilities.css';
import { createApp } from 'vue';
import App from './App.vue';

async function startCreateVue() {
  createApp(App).mount('#app');
}

startCreateVue().then();
