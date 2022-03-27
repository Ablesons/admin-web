/*
 * @Description: 路由警卫
 * @Author: DHL
 * @Date: 2022-01-09 15:57:21
 * @LastEditors: DHL
 * @LastEditTime: 2022-01-24 08:31:50
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { Router } from 'vue-router';
import { stringUtils } from '/@/utils/stringUtils';
import { useLoginUserStore } from '/@/store/modules/loginUser';
import { usePermissionStore } from '/@/store/modules/permission';
import { createPermissionGuard } from './permissionGuard';

NProgress.configure({ showSpinner: false });

/**
 * 路由警卫
 * @param router
 */
export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  createRouterInterceptor(router);
}

/**
 * 路由拦截器
 * @param router
 */
function createRouterInterceptor(router: Router) {
  const permissionStore = usePermissionStore();
  const loginUserStore = useLoginUserStore();

  /**
   * 路由执行前拦截
   */
  router.beforeEach((to, from, next) => {
    NProgress.start();
    console.log(from);
    if (to.meta.unauth) {
      next();
    } else {
      if (stringUtils.isNotEmpty(loginUserStore.token)) {
        if (permissionStore.isDynamicAddedRoute) {
          next();
        } else {
          createPermissionGuard(router);
          next({ ...to, replace: true });
        }
      } else {
        next({ path: '/login', query: { backUrl: to.fullPath } });
      }
    }
  });

  /**
   * 路由执行后拦截
   */
  router.afterEach(to => {
    console.log(to);
    NProgress.done();
  });
}
