//////////////////////////////////////////////////
// 系统认证
//////////////////////////////////////////////////

/**
 * 系统认证，需在服务端注册后才可接入
 */
interface IAppAuth {
  readonly authId: string;
  readonly authToken: string;
  readonly authSecret: string;
}

/**
 * 系统认证，需在服务端注册后才可接入
 */
export const appAuth = (): Readonly<IAppAuth> => {
  const env = import.meta.env;

  const {
    // 认证信息
    VITE_APP_AUTH_ID,
    VITE_APP_AUTH_TOKEN,
    VITE_APP_AUTH_SECRET,
  } = env;

  return {
    authId: VITE_APP_AUTH_ID,
    authToken: VITE_APP_AUTH_TOKEN,
    authSecret: VITE_APP_AUTH_SECRET,
  };
};

//////////////////////////////////////////////////
// 网络请求设置
//////////////////////////////////////////////////

/**
 * 请求设备
 */
export enum DeviceEnum {
  IOS = 'iOS',
  ANDROID = 'Android',
  WINDOWS = 'Windows',
  PC = 'PC',
}

export enum InfoShowTypeEnum {
  LOG,
  NOTIFICATION,
  TOAST,
}

/**
 * 网络请求配置
 */
export interface INetworkConfig {
  baseURL: string;
  timeout: number;
  loading?: false;
  errorShowType?: InfoShowTypeEnum;
  header?: {};
}

/**
 * 网络请求配置
 */
export const networkConfig = (): INetworkConfig => {
  const env = import.meta.env;

  const {
    // 请求接口根路径
    VITE_APP_BASE_API,
  } = env;

  return {
    baseURL: VITE_APP_BASE_API,
    timeout: 60 * 1000,
    loading: false,
    errorShowType: InfoShowTypeEnum.LOG,
    header: {
      device: DeviceEnum.PC,
    },
  };
};
