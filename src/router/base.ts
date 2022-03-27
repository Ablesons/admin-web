import { RouteRecordRaw, RouteComponent } from 'vue-router';
import remainingRouter from './modules/remaining';
import { ascending } from '/@/router/constant';
// import { buildHierarchyTree } from '/@/utils/tree';
const Layout = () => import('/@/layout/index.vue');

// 原始静态路由（未做任何处理）
const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/welcome',
    meta: {
      icon: 'home-filled',
      title: '首页',
      i18n: true,
      rank: 0,
    },
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('/@/views/basis/welcome.vue'),
        meta: {
          title: '首页',
          i18n: true,
        },
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/403',
    meta: {
      icon: 'information-line',
      title: '错误页面',
      i18n: true,
      rank: 9,
    },
    children: [
      {
        path: '/error/403',
        name: '403',
        component: () => import('/@/views/error/403.vue'),
        meta: {
          title: '403',
          i18n: true,
        },
      },
      {
        path: '/error/404',
        name: '404',
        component: () => import('/@/views/error/404.vue'),
        meta: {
          title: '404',
          i18n: true,
        },
      },
      {
        path: '/error/500',
        name: '500',
        component: () => import('/@/views/error/500.vue'),
        meta: {
          title: '500',
          i18n: true,
        },
      },
    ],
  },
];

// 导出处理后的静态路由（三级及以上的路由全部拍成二级）
export const constantRoutes: Array<RouteRecordRaw> = ascending(routes);

// 用于渲染菜单，保持原始层级
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(...remainingRouter);

// 不参与菜单的路由
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});
