import { store } from '/@/store';
import { defineStore } from 'pinia';
import { IUserState } from '/#/store';

/**
 * 登录用户缓存KEY
 */
const LOGIN_USER_KEY = 'LOGIN-USER';

const userStore = defineStore({
  id: 'userStore',
  state: (): IUserState => ({
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
     */
    async login(loginParams: { loginName: string; password: string }) {
      return new Promise((resolve, reject) => {
        const { loginName, password } = loginParams;
        if (loginName === 'admin' && password === '123456') {
          resolve('成功');
        } else {
          reject('失败');
        }
      });
    },

    /**
     * 通过token登录
     */
    async loginByToken(loginParams: { loginName: string; password: string }) {
      return new Promise((resolve, reject) => {
        const { loginName, password } = loginParams;
        if (loginName === 'admin' && password === '123456') {
          resolve('成功');
        } else {
          reject('失败');
        }
      });
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
    },

    setLoginUser(loginUser: Nullable<IUserState>) {
      this.clearLoginUser();
      if (loginUser) {
        Object.assign(this, loginUser);
      }
    },
  },
});

export function useUserStore() {
  return userStore(store);
}
