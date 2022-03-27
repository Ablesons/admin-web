export interface IStorageParams {
  timeout?: Nullable<number>;
}

export interface ILocalStorageParams extends IStorageParams {
  key: string;
  value: any;
}

export interface ISessionStorageParams extends IStorageParams {
  key: string;
  value: any;
}

/**
 * 浏览器存储工具类
 */
class StorageUtils {
  private prefix: string;

  constructor(prefix = 'twb') {
    this.prefix = prefix;
  }

  /**
   * 私有方法获取key
   * @param key
   */
  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  /**
   * 获取超时时间
   * @param timeout
   */
  private getTimeout(timeout?: Nullable<number>) {
    let rtn = 0;

    if (timeout && timeout > 0) {
      rtn = new Date().getTime() + 1000 * timeout;
    } else {
      rtn = new Date().getTime() + 1000 * 60 * 60 * 24 * 1; // 如果用户没传递时间进来就是24小时
    }

    return rtn;
  }

  ////////////////////////////////////////////////////////////
  // localStorage
  ////////////////////////////////////////////////////////////

  /**
   * 获取本地存储的方法
   * localStorage
   * @param key
   */
  public getLocalItem(key: string) {
    key = this.getKey(key);
    const storeData: string | null = window.localStorage.getItem(key);
    if (storeData) {
      const {
        value,
        options: { storeTime },
      } = JSON.parse(storeData);
      // 如果从存储中获取的时间大于当前的时间或者等于0的时候表示当前的localStorage有效
      if (storeTime > new Date().getTime()) {
        return value;
      }
      this.removeLocalItem(key);
      return null;
    }
    return null;
  }

  /**
   * 设置存储
   * localStorage
   * @param key
   * @param value
   * @param time (秒级)
   */
  public setLocalItem(params: ILocalStorageParams) {
    const { key, value, timeout } = params;

    const t_key = this.getKey(key);
    const t_timeout = this.getTimeout(timeout);

    const options: { [propsName: string]: any } = {
      storeTime: t_timeout,
      prefix: this.prefix,
    };

    window.localStorage.setItem(t_key, JSON.stringify({ value, options }));
  }

  /**
   * 删除存储
   * localStorage
   * @param key
   */
  public removeLocalItem(key: string): void {
    const _key = this.getKey(key);
    const value: string | null = this.getLocalItem(key);
    if (value) {
      window.localStorage.removeItem(_key);
    }
  }

  ////////////////////////////////////////////////////////////
  // sessionStorage
  ////////////////////////////////////////////////////////////

  /**
   * 获取本地存储的方法
   * localStorage
   * @param key
   */
  public getSessionItem(key: string) {
    key = this.getKey(key);
    const storeData: string | null = window.sessionStorage.getItem(key);
    if (storeData) {
      const {
        value,
        options: { storeTime },
      } = JSON.parse(storeData);
      // 如果从存储中获取的时间大于当前的时间或者等于0的时候表示当前的localStorage有效
      if (storeTime > new Date().getTime()) {
        return value;
      }
      this.removeSessionItem(key);
      return null;
    }
    return null;
  }

  /**
   * 设置存储
   * localStorage
   * @param key
   * @param value
   * @param time （秒级）
   */
  public setSessionItem(params: ISessionStorageParams) {
    const { key, value, timeout } = params;

    const t_key = this.getKey(key);
    const t_timeout = this.getTimeout(timeout);

    const options: { [propsName: string]: any } = {
      storeTime: t_timeout,
      prefix: this.prefix,
    };

    window.sessionStorage.setItem(t_key, JSON.stringify({ value, options }));
  }

  /**
   * 删除存储
   * localStorage
   * @param key
   */
  public removeSessionItem(key: string): void {
    const _key = this.getKey(key);
    const value: string | null = this.getSessionItem(key);
    if (value) {
      window.sessionStorage.removeItem(_key);
    }
  }
}

export const storageUtils = new StorageUtils('twb');
