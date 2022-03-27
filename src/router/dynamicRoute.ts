/*
 * @Description: 动态路由
 * @Author: DHL
 * @Date: 2021-12-07 11:58:19
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-29 13:17:43
 */
import { AppRouteModule } from '/#/router';

/**
 * 主路由
 */
export const LayoutRoute: AppRouteModule = {
  path: '/',
  name: 'home',
  redirect: '/welcome',
  component: () => import('/@/layout/index.vue'),
  meta: {},
  children: [],
};

/**
 * 动态路由
 */
export const DynamicRoute = [
  {
    name: 'welcome',
    path: 'welcome',
    component: () => import('/@/views/basis/welcome.vue'),
    meta: {
      title: '首页',
      affix: true,
    },
  },
];
