import { defineStore } from 'pinia';
import { store } from '/@/store';
import { storageUtils } from '/@/utils/storageUtils';
import { useLoginUserStore } from '/@/store/modules/loginUser';
import { stringUtils } from '/@/utils/stringUtils';
import { arrayRemoveByPropertyValue } from '/@/utils/twUtils';

const TABLE_SETTING_KEY = 'TW-TABLE-SETTING';

interface ICustomColumn {
  [key: string]: Array<string>;
}

export interface ITableSettingState {
  /**
   * 列设置
   */
  customColumn: ICustomColumn;
}

const tableSettingStore = defineStore({
  id: 'tableSettingState',
  state: (): ITableSettingState => ({
    customColumn: {} as ICustomColumn,
  }),
  getters: {},
  actions: {
    /**
     * 获取登录用户
     */
    getLoginName() {
      let loginName = useLoginUserStore().loginName;
      if (stringUtils.isEmpty(loginName)) {
        loginName = 'defaultLoginName';
      }
      return loginName;
    },

    /**
     * 构建表格配置
     */
    buildTableSettingAction() {
      const tableSettingList: Array<any> = storageUtils.getLocalItem(TABLE_SETTING_KEY);
      if (tableSettingList && tableSettingList.length > 0) {
        const loginName = this.getLoginName();

        let tableSetting: any = null;

        tableSettingList.forEach(item => {
          if (item.key === loginName) {
            tableSetting = item;
          }
        });

        if (tableSetting) {
          this.setTableSetting(tableSetting.value as ITableSettingState);
        }
      }
    },

    setTableSetting(tableSetting: ITableSettingState) {
      this.customColumn = tableSetting.customColumn;
    },

    /**
     * 列设置
     * @param customColumn
     */
    setCustomColumn(customColumn: ICustomColumn) {
      Object.assign(this.customColumn, customColumn);
      this.saveTableSettingAction();
    },

    /**
     * 获取列设置
     */
    getCustomColumn(tableId: string) {
      return this.customColumn[tableId];
    },

    getTableSetting() {
      return {
        customColumn: this.customColumn,
      };
    },

    /**
     * 保存表格配置
     */
    saveTableSettingAction() {
      const loginName = this.getLoginName();

      let tableSettingList: Array<any> = storageUtils.getLocalItem(TABLE_SETTING_KEY);
      if (tableSettingList && tableSettingList.length > 0) {
        arrayRemoveByPropertyValue(tableSettingList, 'key', loginName);
        tableSettingList.push({
          key: loginName,
          value: this.getTableSetting(),
        });
      } else {
        tableSettingList = [
          {
            key: loginName,
            value: this.getTableSetting(),
          },
        ];
      }

      console.info(tableSettingList);

      storageUtils.setLocalItem({
        key: TABLE_SETTING_KEY,
        value: tableSettingList,
      });
    },
  },
});

export function useTableSettingStore() {
  const _tableSettingStore = tableSettingStore(store);
  return _tableSettingStore;
}
