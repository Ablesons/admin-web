/**
 * @Description: 环境配置
 * @Author: Ableson
 * @Date: 2022/3/2 17:42
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/2 17:42
 */
import pkg from '../../package.json';
import { warn } from '/@/utils/log';
import type { GlobEnvConfig } from '/#/config';
import { getConfigFileName } from '../../build/getConfigFileName';

// 获取缓存前缀
export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// 根据版本生成缓存密钥
export function setStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;

  if (!/^[a-zA-Z_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME 变量只能是字符/下划线，请在环境变量中修改并重新运行。`);
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

export const devMode = 'development';

export const prodMode = 'production';

/**
 * 获取环境变量
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * 开发模式校验
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * 生产模式校验
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
