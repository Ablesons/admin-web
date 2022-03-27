/*
 * @Description: 示例路由
 * @Author: DHL
 * @Date: 2021-12-23 13:01:23
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-23 13:37:48
 */

import { RouteRecordRaw } from 'vue-router';
import Layout from '/@/layout/index.vue';

const demoRouter: RouteRecordRaw = {
  path: '/demos',
  component: Layout,
  redirect: 'noredirect',
  name: 'demos',
  meta: {
    title: '示例',
  },
  children: [
    {
      path: '/demo',
      component: () => import('/@/views/demo/index.vue'),
      name: 'demo',
      meta: {
        title: '示例',
        noCache: true,
      },
    },
  ],
};

export const demoRouters = [demoRouter];
