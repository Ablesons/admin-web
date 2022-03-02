/**
 * @Description: 控制台日志
 * @Author: Ableson
 * @Date: 2022/3/2 17:39
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/2 17:39
 */
const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

export function warn(msg: string) {
  console.warn(`[${projectName} warn]: ${msg}`);
}

export function error(msg: string) {
  throw new Error(`[${projectName} error]: ${msg}`);
}
