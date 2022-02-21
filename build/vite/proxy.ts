/**
 * @Description: 用于解析.env.development代理配置
 * @Author: Ableson
 * @Date: 2022/2/19 11:27
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/19 11:27
 */

/**
 * .env.development 的 代理配置
 */
import type { ProxyOptions } from 'vite';

// 第一项被代理的路径，第二项代理至的路径
type ProxyItem = [string, string];

// 方法接收的参数
type ProxyList = ProxyItem[];

// Vite代理所接收对象类型
type ProxyTargetList = Record<string, ProxyOptions>;

// https类型的URL的匹配正则
const httpsRE = /^https:\/\//;

/**
 * 生成代理
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
