/**
 * @Description: 路由声明文件
 * @Author: Ableson
 * @Date: 2022/2/18 10:36
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 10:36
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

export type AppRouteModule = AppRouteRecordRaw;
