/**
 * 开发环境
 * @returns
 */
export function isDev(): boolean {
  return import.meta.env.DEV;
}

/**
 * 生产环境
 * @returns
 */
export function isProd(): boolean {
  return import.meta.env.PROD;
}
