import { defineStore } from 'pinia';
import { store } from '/@/store';
import { AppRouteModule, IMenu } from '/#/router';
import { dynamicImport } from '/@/router/helper/routeHelper';
import { LayoutRoute, DynamicRoute } from '/@/router/dynamicRoute';
import { useLoginUserStore } from './loginUser';

interface IPermissionState {
  /**
   * 许可代码列表
   * 资源主键
   * 用于控制页面细粒度控制
   */
  permCodeList: string[];

  /**
   * 菜单列表
   */
  menuList: object[];

  /**
   * 菜单树
   */
  menuTree: IMenu[];

  /**
   * 异步路由
   */
  asyncRouter: AppRouteModule[];

  /**
   * 动态路由是否已添加
   */
  isDynamicAddedRoute: boolean;
}

const permissionStore = defineStore({
  id: 'permissionStore',
  state: (): IPermissionState => ({
    permCodeList: [],
    menuList: [],
    menuTree: [],
    asyncRouter: [],
    isDynamicAddedRoute: false,
  }),
  getters: {
    getPermCodeList(): string[] {
      return this.permCodeList;
    },

    getMenuTree(): IMenu[] {
      return this.menuTree;
    },
  },
  actions: {
    /**
     * 初始化权限
     */
    setPermission(resources: Nullable<object[]>) {
      if (resources && resources.length > 0) {
        this.setMenuList(resources);
        this.setPermCodeList(resources);
      }
    },

    /**
     * 设置许可代码列表
     * 用于控制页面细粒度控制
     * @param resources
     */
    setPermCodeList(resources: object[]) {
      const ids: string[] = [];
      resources.forEach((res: any) => {
        // 资源类型（0-菜单；1-功能；2-页签）
        if (res.resType === '1' && !ids.includes(res.id)) {
          ids.push(res.id);
        }
      });
      this.permCodeList = ids;
    },

    /**
     * 资源集合
     * @param resources
     */
    setMenuList(resources: object[]) {
      const menus: object[] = [];
      resources.forEach((res: any) => {
        // 资源类型（0-菜单；1-功能；2-页签）
        if (res.resType === '0') {
          this.formatResIdToPath(res);
          menus.push(res);
        }
      });
      this.menuList = menus;
      this.setMenuTree();
    },

    /**
     * 左侧菜单
     */
    setMenuTree() {
      this.menuTree = this.menuListToTree('');
    },

    /**
     * 清理
     */
    clearPermission() {
      this.permCodeList = [];
      this.menuList = [];
      this.menuTree = [];
      this.asyncRouter = [];
      this.isDynamicAddedRoute = false;
    },

    /**
     * 设置路由
     */
    buildRoutesAction() {
      useLoginUserStore().initLoginUserByLocalStorage();

      const routerList: AppRouteModule[] = [];

      for (const menu of this.menuList) {
        const { id, path, name, url, iscache } = menu as any;
        if (url) {
          const isCache = 1 === iscache ? true : false;
          const component = dynamicImport(url);
          const router: AppRouteModule = {
            path: path,
            name: id,
            component: component,
            meta: {
              title: name,
              isCache: isCache,
            },
          };
          routerList.push(router);
        }
      }

      LayoutRoute.children = [...DynamicRoute, ...routerList] as any;

      this.asyncRouter.push(LayoutRoute);

      if (routerList.length > 0) {
        this.isDynamicAddedRoute = true;
      }
    },

    /**
     * 菜单 list 转 tree
     */
    menuListToTree(pid: string) {
      // 资源菜单集合
      const menuTree: IMenu[] = [];

      for (const menu of this.menuList) {
        const { id, path, name, parentResId } = menu as any;

        const menuItem: IMenu = {
          id: id,
          path: path,
          name: name,
          icon: 'accountBook',
          children: [],
        };

        const _parentResId = parentResId ? parentResId : '';
        if (pid === _parentResId) {
          // 递归
          const menuChildren = this.menuListToTree(id);

          if (menuChildren && menuChildren.length > 0) {
            menuItem.children = menuChildren;
          }

          menuTree.push(menuItem);
        }
      }

      return menuTree;
    },

    /**
     * 格式化资源ID为路由path值
     * @param res
     */
    formatResIdToPath(res: { id: string; path: string }) {
      let id = res.id;

      id = id.toLowerCase();

      let path = id.replace(/\_(\w)/g, function (all: any, letter: any) {
        console.log(all);
        return letter.toUpperCase();
      });

      path = path.replace(/\-(\w)/g, function (all: any, letter: any) {
        console.log(all);
        return letter.toUpperCase();
      });

      path = path.replace('twb', '').replace('tw', '');

      res.path = path;
    },

    resetState(): void {
      this.permCodeList = [];
      this.menuTree = [];
    },
  },
});

export function usePermissionStore() {
  return permissionStore(store);
}
