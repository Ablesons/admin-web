import { defineStore } from 'pinia';
import { store } from '/@/store';
import { apiCacheRefresh, apiCacheSearchList } from '/@/api/common/cache';
import { storageUtils } from '/@/utils/storageUtils';
import { DataDicModel } from '/@/api/common/model/cacheModel';

export interface ICacheDataState {
  /**
   * key  [typeCode+dataValue]
   * value  字典对象
   */
  dataDicObj: Nullable<Map<string, DataDicModel>>;

  /**
   * key  [typeCode]
   * value  字典集合
   */
  dataDic: Nullable<Map<string, Array<DataDicModel>>>;

  /**
   * key  [typeCode+dataName]
   * value  字典值
   */
  dataValue: Nullable<Map<string, string>>;

  /**
   * key  [typeCode+dataValue]
   * value  字典值名称
   */
  dataName: Nullable<Map<string, string>>;

  /**
   * 系统配置
   */
  sysConfig: Nullable<Map<string, string>>;
}

/**
 * 数据缓存KEY
 */
const CACHE_DATA_KEY = 'TW-CACHE-DATA';

const cacheDataStore = defineStore({
  id: 'cacheDataStore',
  state: (): ICacheDataState => ({
    dataDicObj: null,
    dataDic: null,
    dataValue: null,
    dataName: null,
    sysConfig: null,
  }),
  getters: {},
  actions: {
    /**
     * 构建缓存数据
     */
    buildCacheDataAction() {
      if (this.dataDic && this.dataDic.size > 0) {
        return;
      }

      const cacheData: ICacheDataState = storageUtils.getLocalItem(CACHE_DATA_KEY);
      if (cacheData && cacheData.dataDic && Object.keys(cacheData.dataDic).length > 0) {
        this.setCacheData(cacheData);
        return;
      }

      this.searchCacheDataAction();
    },

    /**
     * 查询缓存数据
     */
    searchCacheDataAction() {
      apiCacheSearchList().then(result => {
        if (result?.success) {
          this.setCacheData(result.data);
        } else {
          console.error(result?.message);
        }
      });
    },

    /**
     * 刷新缓存数据
     */
    refreshCacheDataAction() {
      apiCacheRefresh().then(result => {
        if (result?.success) {
          this.setCacheData(result.data);
        } else {
          console.error(result?.message);
        }
      });
    },

    setCacheData(cacheData: ICacheDataState) {
      const { dataDic, dataValue, dataName, sysConfig } = cacheData;

      storageUtils.setLocalItem({
        key: CACHE_DATA_KEY,
        value: cacheData,
      });

      if (dataDic) {
        const dataDicMap: Map<string, Array<DataDicModel>> = new Map();
        const dataDicObjMap: Map<string, DataDicModel> = new Map();
        for (const [key, val] of Object.entries(dataDic)) {
          const value = val as Array<DataDicModel>;

          dataDicMap.set(key, value);

          value.forEach(item => {
            dataDicObjMap.set(`${key}${item.dataValue}`, item);
          });
        }
        this.dataDic = dataDicMap;
        this.dataDicObj = dataDicObjMap;
      }

      if (dataValue) {
        const dataValueMap: Map<string, string> = new Map();
        for (const [key, val] of Object.entries(dataValue)) {
          dataValueMap.set(key, val);
        }
        this.dataValue = dataValueMap;
      }

      if (dataName) {
        const dataNameMap: Map<string, string> = new Map();
        for (const [key, val] of Object.entries(dataName)) {
          dataNameMap.set(key, val);
        }
        this.dataName = dataNameMap;
      }

      if (sysConfig) {
        const sysConfigMap: Map<string, string> = new Map();
        for (const [key, val] of Object.entries(sysConfig)) {
          sysConfigMap.set(key, val);
        }
        this.sysConfig = sysConfigMap;
      }
    },

    /**
     * 清理缓存数据
     */
    clearCacheData() {
      storageUtils.removeLocalItem(CACHE_DATA_KEY);
      this.dataDic = null;
      this.dataValue = null;
      this.dataName = null;
      this.sysConfig = null;
    },
  },
});

export function useCacheDataStore() {
  return cacheDataStore(store);
}
