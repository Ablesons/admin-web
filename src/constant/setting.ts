/*
 * @Description: 属性设置常量
 * @Author: DHL
 * @Date: 2021-12-16 15:27:13
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-16 15:49:07
 */

export enum LanguageEnum {
  En = 'en',
  Zh = 'zh-cn',
}

/**
 * 在哪些环境下显示高亮错误
 */
export enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
}

/**
 * 路由模式，可选值为 history 或 hash
 */
export enum RouterModeEnum {
  Hash = 'hash',
  HISTORY = 'history',
}

/**
 * （前端导出路由）和backEnd（后端导出路由）两种方式
 */
export enum RouterSourceEnum {
  Frontend = 'frontend',
  Backend = 'backend',
}
