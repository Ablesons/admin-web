/*
 * @Description: 动态路由
 * @Author: DHL
 * @Date: 2022-01-09 15:56:57
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-24 08:31:33
 */

import type { Router, RouteRecordRaw } from 'vue-router';
import { usePermissionStore } from '/@/store/modules/permission';

/**
 * 注册服务端返回动态路由
 * 注册前端配置的动态路由
 * @param router
 */
export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStore();
  permissionStore.buildRoutesAction();
  permissionStore.asyncRouter.forEach(route => {
    router.addRoute(route as unknown as RouteRecordRaw);
  });
}
