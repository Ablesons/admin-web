import qs from 'qs';
import { MethodEnum, RequestParams } from '/@/constant/http';

export default class DuplicateRequest {
  private static _instance: DuplicateRequest;
  private constructor() {}
  static getInstance() {
    if (!this._instance) {
      this._instance = new DuplicateRequest();
    }
    return this._instance;
  }

  static lastRequestTimeStamp = 0;
  static lastIdentityCode = '';

  /**
   * 验证是否是相同的url点击过快
   * @param url
   * @param method
   * @param params
   * @param interval
   * @returns
   */
  static hashUrlAndParams(url: string, method: MethodEnum, params: RequestParams, interval = 1000) {
    const identityCode = [url, method, qs.stringify(params)].join('&');
    const currentTime = Date.parse(new Date().toString());
    if (
      currentTime - DuplicateRequest.lastRequestTimeStamp < interval &&
      DuplicateRequest.lastIdentityCode === identityCode
    ) {
      return true;
    } else {
      DuplicateRequest.lastRequestTimeStamp = currentTime;
      DuplicateRequest.lastIdentityCode = identityCode;
      return false;
    }
  }
}
