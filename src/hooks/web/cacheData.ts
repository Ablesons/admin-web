import { DataDicModel } from '/@/api/common/model/cacheModel';
import { useCacheDataStore } from '/@/store/modules/cacheData';

export function useCacheData() {
  const cacheDataStore = useCacheDataStore();

  /**
   * 获取字典列表
   * @param key [typeCode]
   * @returns
   */
  function getDic(key: string): Nullable<Array<DataDicModel>> {
    return cacheDataStore.dataDic?.get(key);
  }

  /**
   * 获取字典明文
   * @param key [typeCode]
   * @param value [dataValue]
   * @returns
   */
  function getDicName(key: string, value: string): Nullable<string> {
    return cacheDataStore.dataName?.get(`${key}${value}`);
  }

  /**
   * 获取字典值
   * @param key [typeCode]
   * @param value [dataName]
   * @returns
   */
  function getDicValue(key: string, value: string): Nullable<string> {
    return cacheDataStore.dataValue?.get(`${key}${value}`);
  }

  /**
   * 获取字典明文
   * @param key [typeCode]
   * @param value [dataValue]
   * @returns
   */
  function getDicObj(key: string, value: string): Nullable<DataDicModel> {
    return cacheDataStore.dataDicObj?.get(`${key}${value}`);
  }

  /**
   * 获取系统配置
   * @param key
   * @returns
   */
  function getSysConfig(key: string): Nullable<string> {
    return cacheDataStore.sysConfig?.get(key);
  }

  return { getDic, getDicName, getDicValue, getDicObj, getSysConfig };
}
