import https from '/@/utils/http/axios';
import { HttpRequestConfig } from '/@/utils/http/types';

export const $get = (options: HttpRequestConfig): Promise<any> => {
  Object.assign(options, { method: 'GET' });
  return https.request(options);
};

export const $post = (options: HttpRequestConfig): Promise<any> => {
  Object.assign(options, { method: 'POST' });
  return https.request(options);
};

export const $put = (options: HttpRequestConfig): Promise<any> => {
  Object.assign(options, { method: 'PUT' });
  return https.request(options);
};

export const $delete = (options: HttpRequestConfig): Promise<any> => {
  Object.assign(options, { method: 'DELETE' });
  return https.request(options);
};
