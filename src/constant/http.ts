/*
 * @Description: 网络请求
 * @Author: DHL
 * @Date: 2021-12-20 21:20:10
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-20 21:22:13
 */

/**
 * 网络请求类型
 */
export enum ContentTypeEnum {
  form = 'application/x-www-form-urlencoded',
  json = 'application/json; charset=utf-8',
  multipart = 'multipart/form-data',
}

/**
 * 网络请求方法
 */
export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * 网络请求参数
 */
export interface RequestParams {
  [key: string]: any;
}
