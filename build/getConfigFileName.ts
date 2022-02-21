/**
 * @Description: 获取配置文件变量名
 * @Author: Ableson
 * @Date: 2022/2/21 14:27
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/21 14:27
 */

/**
 * 获取配置文件变量名
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};
