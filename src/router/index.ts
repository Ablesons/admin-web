/*
 * @Description: 路由配置
 * @Author: DHL
 * @Date: 2021-12-07 08:52:06
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-24 08:31:56
 */

import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import { setupRouterGuard } from './guard';
import { basicRoutes } from './basicRoutes';
import { demoRouters } from './demoRoutes';

const constantRoutes = [...basicRoutes, ...demoRouters];

/**
 * 创建路由
 */
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

/**
 * 配置路由
 * @param app
 */
export function setupRouter(app: App<Element>) {
  setupRouterGuard(router);

  app.use(router);
}
