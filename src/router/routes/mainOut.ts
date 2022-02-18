/**
 * @Description: 此文件的路由将不会显示布局。这是一个独立的新页面。文件的内容仍然需要登录才能访问
 * @Author: Ableson
 * @Date: 2022/2/18 15:17
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 15:17
 */
import type { AppRouteModule } from '/@/router/types';

export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('/@/views/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
