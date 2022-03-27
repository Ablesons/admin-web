import {
  RouteRecordRaw,
  RouterHistory,
  RouteComponent,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { router } from '/@/router/index';
import { RouteConfigs } from './types';
// import { getAsyncRoutes } from '/@/api/user';
import { buildHierarchyTree } from '/@/utils/tree';

// 按照路由中meta下的rank等级升序来排序路由
export function ascending(arr: any[]) {
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta?.rank - b?.meta?.rank;
  });
}

// 过滤meta中showLink为false的路由
export function filterTree(data: RouteComponent[]) {
  const newTree = data.filter((v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false);
  newTree.forEach((v: { children }) => {
    v.children && (v.children = filterTree(v.children));
  });
  return newTree;
}

// 批量删除缓存路由(keepalive) 未完
export function delAliveRoutes(delAliveRouteList: Array<RouteConfigs>) {
  delAliveRouteList.forEach(route => {
    console.log(route);
    // usePermissionStoreHook().cacheOperate({
    //   mode: 'delete',
    //   name: route?.name,
    // });
  });
}

// 通过path获取父级路径
export function getParentPaths(path: string, routes: RouteRecordRaw[]) {
  // 深度遍历查找
  function dfs(routes: RouteRecordRaw[], path: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 找到path则返回父级path
      if (item.path === path) {
        return parents;
      }
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) {
        continue;
      }
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, path, parents).length) {
        return parents;
      }
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }

  return dfs(routes, path, []);
}

// 查找对应path的路由信息
export function findRouteByPath(path: string, routes: RouteRecordRaw[]) {
  let res = routes.find((item: { path: string }) => item.path == path);
  if (res) {
    return res;
  }
  for (let i = 0; i < routes.length; i++) {
    const children = routes[i].children;
    if (children instanceof Array && children.length > 0) {
      res = findRouteByPath(path, children);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

// 重置路由
export function resetRouter(): void {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// 初始化路由
export function initRouter(name: string) {
  console.log(name);
  // return new Promise((resolve, reject) => {});
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
export function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) {
    return routesList;
  }
  let hierarchyList: any = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * https://github.com/xiaoxian521/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
export function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) {
    return routesList;
  }
  const newRoutesList: RouteRecordRaw[] = [];
  routesList.forEach((v: RouteRecordRaw) => {
    if (v.path === '/') {
      // @ts-ignore
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: [],
      });
    } else {
      // @ts-ignore
      newRoutesList[0].children.push({ ...v });
    }
  });
  return newRoutesList;
}

// 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
export function getHistoryMode(history: string): RouterHistory {
  // len为1 代表只有历史模式 为2 代表历史模式中存在base参数 https://next.router.vuejs.org/zh/api/#%E5%8F%82%E6%95%B0-1
  const historyMode: string[] = history.split(',');
  const leftMode: string = historyMode[0];
  const rightMode: string = historyMode[1];
  // no param
  if (historyMode.length === 1) {
    if (leftMode === 'hash') {
      return createWebHashHistory('');
    } else if (leftMode === 'h5') {
      return createWebHistory('');
    }
  } //has param
  else if (historyMode.length === 2) {
    if (leftMode === 'hash') {
      return createWebHashHistory(rightMode);
    } else if (leftMode === 'h5') {
      return createWebHistory(rightMode);
    }
  }
  return createWebHashHistory(history);
}
