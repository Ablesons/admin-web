import { AxiosRequestConfig, Method } from 'axios';

/**
 * 请求方法
 */
export type RequestMethods = Extract<
  Method,
  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTION' | 'HEAD'
>;

export enum ContentTypeEnum {
  form = 'application/x-www-form-urlencoded',
  json = 'application/json; charset=UTF-8',
  multipart = 'multipart/form-data',
}

/**
 * 网络请求参数
 */
export interface ParamsOption {
  [key: string]: any;
}

/**
 * 请求配置
 */
export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 默认Params
   */
  defaultParams?: ParamsOption;
  /**
   * 是否开启打印
   */
  log?: boolean;
  /**
   * 是否开启检查快速点击事件
   */
  checkQuickClick?: boolean;
  /**
   * 点击时间间隔
   */
  clickInterval?: number;
}
