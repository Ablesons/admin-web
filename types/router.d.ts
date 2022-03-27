import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  name: string;
  redirect?: string;
  component?: Component | string;
  meta: RouteMeta;
  children?: [];
}

export interface IMenu {
  id: string;
  path: string;
  name: string;
  icon?: string;
  children?: IMenu[];
}

export type AppRouteModule = AppRouteRecordRaw;
