import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  ContentTypeEnum,
  HttpRequestConfig,
  ParamsOption,
  RequestMethods,
} from '/@/utils/http/types';

class AxiosRequest {
  private static axiosInstance: AxiosInstance;
  private readonly options: HttpRequestConfig;

  constructor(options: HttpRequestConfig = {}) {
    this.options = options;
    this.axiosInstance = axios.create(options);
  }

  public supportFormData(config: HttpRequestConfig) {
    const headers = config.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.json ||
      config.method === 'GET' ||
      !Reflect.has(config, 'data')
    ) {
      return config;
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  public async request<T>(requestOptions: HttpRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let config: HttpRequestConfig = Object.assign({}, this.options, requestOptions);
      config.headers = Object.assign(
        {},
        {
          'X-Appid': '',
          'X-AppToken': '',
          'X-AppSecret': '',
          'X-Token': '',
        },
        config.headers
      );
      config = this.supportFormData(config);

      if (options.checkQuickClick) {
        options.log && console.log('快速点击');
        return null;
      }
      this.axiosInstance
        .request(config)
        .then(res => {
          resolve(res);
        })
        .catch(async error => {
          reject(error);
        });
    });
  }
}
const https = new AxiosRequest({
  baseURL: '',
  timeout: 10000,
  responseType: 'json',
  checkQuickClick: true,
});

/**
 * 请求拦截器
 */
https.axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

https.axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default https;
