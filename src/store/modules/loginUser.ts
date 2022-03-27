import { defineStore } from 'pinia';
import { apiLogin, apiLoginByToken, apiLogOut } from '/@/api/common/login';
import { LoginUserModel } from '/@/api/common/model/loginModel';
import { store } from '/@/store';
import { stringUtils } from '/@/utils/stringUtils';
import { storageUtils } from '/@/utils/storageUtils';
import { usePermissionStore } from './permission';
import { useCacheDataStore } from './cacheData';
import { resetRouter } from '/@/router';
import { useTagsViewStore } from './tagsView';
import { useTableSettingStore } from './tableSetting';

/**
 * 权限
 */
const permissionStore = usePermissionStore();

/**
 * 登录用户缓存KEY
 */
const LOGIN_USER_KEY = 'TW-LOGIN-USER';

export type ILoginUserState = LoginUserModel;

const loginUserStore = defineStore({
  id: 'loginUserStore',
  state: (): ILoginUserState => ({
    id: null,
    ip: null,
    loginName: null,
    name: null,
    userType: null,
    status: 1,
    firstLogin: 0,
    organizations: null,
    roles: null,
    resources: null,
    avatar: null,
    introduction: null,
    token: null,
  }),
  getters: {},
  actions: {
    /**
     * 登录
     * @param loginParams
     * @returns
     */
    login(loginParams: { loginName: string; password: string }) {
      return new Promise((resolve, reject) => {
        apiLogin(loginParams)
          .then(result => {
            if (result?.data) {
              const loginUser: Nullable<LoginUserModel> = result?.data;
              this.setLoginUser(loginUser);
              resolve(result);
            } else {
              reject(result);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 通过token登录
     * @returns
     */
    loginByToken() {
      return new Promise((resolve, reject) => {
        apiLoginByToken()
          .then(result => {
            if (result?.data) {
              const loginUser: Nullable<LoginUserModel> = result?.data;
              this.setLoginUser(loginUser);
              resolve(result);
            } else {
              reject(result);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    logOut() {
      apiLogOut();

      // 重置缓存登录用户
      this.clearLoginUser();

      // 重置路由
      resetRouter();
    },

    /**
     * 初始化缓存
     */
    initLoginUserByLocalStorage() {
      if (stringUtils.isEmpty(this.id)) {
        const loginUser: ILoginUserState = storageUtils.getLocalItem(LOGIN_USER_KEY);
        this.setLoginUser(loginUser);
      }
    },

    clearLoginUser() {
      this.id = null;
      this.ip = null;
      this.loginName = null;
      this.name = null;
      this.userType = null;
      this.status = 1;
      this.firstLogin = 0;
      this.organizations = null;
      this.roles = null;
      this.resources = null;
      this.avatar = null;
      this.introduction = null;
      this.token = null;

      // 删除缓存登录用户
      storageUtils.removeLocalItem(LOGIN_USER_KEY);

      // 重置缓存数据
      useCacheDataStore().clearCacheData();

      // 重置权限
      usePermissionStore().clearPermission();

      // 重置导航页签
      useTagsViewStore().clearView();
    },

    /**
     * 设置登录用户
     */
    setLoginUser(loginUser: Nullable<ILoginUserState>) {
      this.clearLoginUser();

      if (loginUser) {
        Object.assign(this, loginUser);

        permissionStore.setPermission(loginUser.resources);

        storageUtils.setLocalItem({
          key: LOGIN_USER_KEY,
          value: loginUser,
        });

        // 构建字典缓存
        useCacheDataStore().buildCacheDataAction();

        // 构建表格配置
        useTableSettingStore().buildTableSettingAction();
      }
    },

    setFirstlogin() {},
  },
});

export function useLoginUserStore() {
  const _loginUserStore = loginUserStore(store);
  _loginUserStore.initLoginUserByLocalStorage();
  return _loginUserStore;
}
