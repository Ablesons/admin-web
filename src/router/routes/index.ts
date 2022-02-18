/**
 * @Description: 项目路由配置
 * @Author: Ableson
 * @Date: 2022/2/18 10:34
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 10:34
 */
import type { AppRouteRecordRaw } from '/@/router/types';
import { PageEnum } from '/@/enums/pageEnum';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: '登录',
  },
};
