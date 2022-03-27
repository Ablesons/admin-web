/*
 * @Description: 静态路由
 * @Author: DHL
 * @Date: 2021-12-07 11:58:19
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-18 21:18:49
 */

import { RouteRecordRaw } from 'vue-router';
import Layout from '/@/layout/index.vue';

/**
 * 登录
 */
const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/basis/login.vue'),
  meta: {
    title: '登录',
    unauth: true,
  },
};

/**
 * 重定向
 */
const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirect',
  component: Layout,
  meta: { hidden: true },
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('/@/views/basis/redirect.vue'),
      meta: { title: 'redirect', unauth: true },
    },
  ],
};

export const basicRoutes = [LoginRoute, RedirectRoute];
