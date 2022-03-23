import { RouteLocationNormalized } from 'vue-router';

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    keepAlive?: boolean;
    refreshRedirect: string;
    dynamicLevel?: string;
  };
}

export type routeMetaType = {
  title?: string;
  i18n?: boolean;
  icon?: string;
  showLink?: boolean;
  savedPosition?: boolean;
  authority?: Array<string>;
};

export type RouteConfigs = {
  path?: string;
  parentPath?: string;
  query?: object;
  meta?: routeMetaType;
  children?: RouteConfigs[];
  name?: string;
};
