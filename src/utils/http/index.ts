import { ContentTypeEnum, MethodEnum, RequestParams } from '/@/constant/http';
import https from './httpClient';
import { stringUtils } from '../stringUtils';
import { AxiosRequestConfig } from 'axios';
import { getTimestamp } from '../dateUtils';
import { ElMessage } from 'element-plus';

export interface IOptions {
  /**
   * 接口地址
   */
  url: string;

  /**
   * 请求参数
   */
  params?: RequestParams;

  /**
   * 请求类型，默认为JSON
   */
  contentType?: ContentTypeEnum;

  /**
   * 请求配置，会覆盖其他参数
   */
  optionsSource?: AxiosRequestConfig;
}

/**
 * 处理查询参数，排除空值条件
 * @param params
 * @returns
 */
function getSearchParams<T>(params: Nullable<RequestParams>): T {
  // 实际提交参数
  const submitParams: RequestParams = {};
  if (params) {
    for (const key in params) {
      const value = params[key];
      if (stringUtils.isNotEmpty(value) && typeof value !== 'function') {
        submitParams[key] = value;
      }
    }
  }

  return submitParams as T;
}

/**
 * Get请求
 * @param options
 * @returns
 */
export function $get<T>(options: IOptions): Promise<T | null> {
  // 实际提交参数
  const submitParams = getSearchParams<RequestParams>(options.params);

  return https.request<T>(
    options.url,
    MethodEnum.GET,
    submitParams,
    options.contentType,
    options.optionsSource
  );
}

/**
 * Post请求
 * 后一个请求不会把第一个请求覆盖掉。（所以Post用来增资源）
 * @param options
 * @returns
 */
export function $post<T>(options: IOptions): Promise<T | null> {
  return https.request<T>(
    options.url,
    MethodEnum.POST,
    options.params,
    options.contentType,
    options.optionsSource
  );
}

/**
 * Put请求
 * 如果两个请求相同，后一个请求会把第一个请求覆盖掉。（所以PUT用来改资源）
 * @param options
 * @returns
 */
export function $put<T>(options: IOptions): Promise<T | null> {
  return https.request<T>(
    options.url,
    MethodEnum.PUT,
    options.params,
    options.contentType,
    options.optionsSource
  );
}

/**
 * Delete请求
 * @param options
 * @returns
 */
export function $delete<T>(options: IOptions): Promise<T | null> {
  return https.request<T>(
    options.url,
    MethodEnum.DELETE,
    options.params,
    options.contentType,
    options.optionsSource
  );
}

/**
 * 导出Excel
 * 下载流文件
 * @param options
 * @returns
 */
export function $exportExcel<T>(options: IOptions): Promise<T | null> {
  return new Promise((resolve, reject) => {
    // 实际提交参数
    const submitParams = getSearchParams<RequestParams>(options.params);

    let fileName = submitParams.fileName;

    if (stringUtils.isEmpty(fileName)) {
      fileName = getTimestamp();
    }

    const optionsSource: AxiosRequestConfig = Object.assign(
      {
        responseType: 'blob',
      },
      options.optionsSource
    );

    https
      .request<T>(options.url, MethodEnum.GET, options.params, options.contentType, optionsSource)
      .then((result: any) => {
        const type = result.type || '';

        if (type === 'application/json') {
          const reader = new FileReader();
          reader.readAsText(result);
          reader.onload = function (e: any) {
            const res = JSON.parse(e.target.result); //此处的msg就是后端返回的msg内容

            if (res.message) {
              ElMessage({
                message: res.message,
                type: 'error',
              });
            }

            resolve(res);
          };
        } else if (
          type === 'application/vnd.ms-excel' ||
          type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          const blob = new Blob([result], { type: 'application/xlsx' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a'); // 创建a标签
          link.href = url;
          link.download = `${fileName}.xlsx`; // 重命名文件
          link.click();
          URL.revokeObjectURL(url); // 下载完成释放URL 对象

          resolve(result);
        } else {
          const error: any = new Error();
          error.message = '服务器内部错误';
          reject(error);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

/**
 * 下载文件
 * @param options
 * @param progressCallback  下载进度回调
 * @returns
 */
export function $download<T>(options: IOptions, progressCallback?: Function): Promise<T | null> {
  return new Promise((resolve, reject) => {
    // 实际提交参数
    const submitParams = getSearchParams<RequestParams>(options.params);

    let fileName = submitParams.fileName;

    if (stringUtils.isEmpty(fileName)) {
      fileName = getTimestamp();
    }

    const optionsSource: AxiosRequestConfig = Object.assign(
      {
        responseType: 'blob',
        onDownloadProgress: function (progressEvent: any) {
          // 对原生进度事件的处理
          if (progressCallback) {
            progressCallback(progressEvent); //监听文件下载进度;
          }
        },
      },
      options.optionsSource
    );

    https
      .request<T>(options.url, MethodEnum.GET, options.params, options.contentType, optionsSource)
      .then((result: any) => {
        const type = result.type || '';

        if (type === 'application/json') {
          const reader = new FileReader();
          reader.readAsText(result);
          reader.onload = function (e: any) {
            const res = JSON.parse(e.target.result); //此处的msg就是后端返回的msg内容

            if (res.message) {
              ElMessage({
                message: res.message,
                type: 'error',
              });
            }

            resolve(res);
          };
        } else if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
          (window.navigator as any).msSaveBlob(result, fileName);
          resolve(result);
        } else {
          const blobURL = window.URL.createObjectURL(result); // 将blob对象转为一个URL
          const link = document.createElement('a'); // 创建a标签
          link.href = blobURL;
          link.setAttribute('download', fileName); // 给a标签添加下载属性

          if (typeof link.download === 'undefined') {
            link.setAttribute('target', '_blank');
          }

          link.click();
          URL.revokeObjectURL(blobURL); // 下载完成释放URL 对象

          resolve(result);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
