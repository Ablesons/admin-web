import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import qs from 'qs';
import { Convert } from '../convertUtils';
import DuplicateRequest from './duplicate';
import { ContentTypeEnum, MethodEnum, RequestParams } from '/@/constant/http';
import { useAppAuth, useNetworkConfig } from '/@/hooks/setting';
import { Result } from '/@/model/baseModel';
import { useLoginUserStore } from '/@/store/modules/loginUser';

//////////////////////////////////////////////////
// 配置
/////////////////////////////////////////////////

interface IHttpClientConfig extends AxiosRequestConfig {
  defaultParams?: RequestParams;
  /**
   * 是否开启打印
   */
  log?: boolean;

  /**
   * 是否开启检查快速点击事件
   */
  checkQuickClick?: boolean;

  /**
   * click interval (点击间隔时间)
   */
  clickInterval?: number;
}

//////////////////////////////////////////////////
// 网络请求
//////////////////////////////////////////////////

/**
 * 网络请求
 */
class HttpClient {
  public defaultConfig: IHttpClientConfig;
  public httpClient: AxiosInstance;

  constructor(options: IHttpClientConfig = {}) {
    this.httpClient = axios.create(options);
    this.defaultConfig = options;
  }

  /**
   * 封装请求类
   * @param path    请求路径
   * @param method  请求方式
   * @param params  参数
   * @param contentType http配置
   * @param optionsSource
   */
  public async request<T>(
    path = '',
    method: MethodEnum = MethodEnum.GET,
    params?: RequestParams,
    contentType: ContentTypeEnum = ContentTypeEnum.form,
    optionsSource?: IHttpClientConfig
  ) {
    return new Promise<T>((resolve, reject) => {
      const options: IHttpClientConfig = Object.assign({}, this.defaultConfig, optionsSource);

      const { headers, clickInterval } = options;

      const loginUserStore = useLoginUserStore();

      Object.assign(headers, {
        'Content-type': contentType,
        'X-AppId': useAppAuth.authId,
        'X-AppToken': useAppAuth.authToken,
        'X-AppSecret': useAppAuth.authSecret,
        'X-Token': loginUserStore.token,
      });

      const allParams = Object.assign({}, this.defaultConfig.defaultParams, params);

      const requestConfig: IHttpClientConfig = Object.assign(
        {
          url: `${path}`,
          method,
          headers,
        },
        optionsSource
      );

      if (
        options.checkQuickClick === true &&
        DuplicateRequest.hashUrlAndParams(requestConfig.url ?? '', method, allParams, clickInterval)
      ) {
        options.log && console.log('click quick');
        return null;
      }

      if (method === MethodEnum.GET) {
        requestConfig.params = allParams;
      } else {
        if (contentType === ContentTypeEnum.form) {
          requestConfig.data = qs.stringify(allParams);
        } else {
          requestConfig.data = JSON.stringify(allParams);
        }
      }

      this.httpClient
        .request(requestConfig)
        .then(res => {
          options.log && console.log(res);

          const data: string = JSON.stringify(res.data);

          if (res.status >= 200 && res.status < 300) {
            const rtn = Convert.jsonToModel(data) as T;
            resolve(rtn);
          } else {
            reject(data);
          }
        })
        .catch(async error => {
          reject(error);
        });
    });
  }
}

//////////////////////////////////////////////////
// 创建https对象
//////////////////////////////////////////////////
const config: IHttpClientConfig = {
  baseURL: useNetworkConfig.baseURL,
  checkQuickClick: true,
  timeout: useNetworkConfig.timeout,
  headers: useNetworkConfig.header,
};

const https = new HttpClient(config);

/**
 * 添加请求拦截器
 */
https.httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
https.httpClient.interceptors.response.use(
  function (response) {
    // Do something with response data

    if (response.status >= 200 && response.status < 300) {
      const resultData: Result<any> = response.data;
      if (!resultData.success) {
        switch (resultData.code) {
          case 'unauthorized': // 令牌失效
            ElMessageBox.confirm('您已被登出，请重新登录', '确定登出', {
              confirmButtonText: '重新登录',
              showClose: false,
              showCancelButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              type: 'warning',
            }).then(() => {
              useLoginUserStore().logOut();
              location.reload();
            });
            break;

          case 'forbidden': // 无权限访问
            ElMessage({
              message: resultData.message,
              type: 'warning',
            });
            break;
          default:
            break;
        }
      }
    }

    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default https;
