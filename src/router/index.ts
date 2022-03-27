import type { App } from 'vue';
import { createRouter } from 'vue-router';
import { toRouteType } from './types';
// import { isUrl } from '/@/utils/verify';
import { getHistoryMode } from '/@/router/constant';
import NProgress from '/@/utils/progress';

// 创建路由实例
export const router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('/@/layout/index.vue'),
      meta: {
        title: '登录',
        showLink: false,
        i18n: true,
        rank: 101,
      },
    },
    /*{
      path: '/login',
      name: 'login',
      component: () => import('/@/views/basis/login.vue'),
      meta: {
        title: '登录',
        showLink: false,
        i18n: true,
        rank: 101,
      },
    },*/
  ],
  strict: true,
  /* eslint-disable */
  // @ts-ignore
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      }
      if (from.meta.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop;
        resolve({ left: 0, top });
      }
    });
  },
  /* eslint-enable */
});

// 路由白名单
const whiteList = ['/login'];
console.log(whiteList);

router.beforeEach((to: toRouteType, _from, next) => {
  console.log(to);
  console.log(_from);
  console.log(next);
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
