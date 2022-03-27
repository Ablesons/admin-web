import { intersection } from 'lodash-es';
import { usePermissionStore } from '/@/store/modules/permission';
import { isArray } from '/@/utils/isUtils';

/**
 * 用户权限相关操作
 */
export function usePermission() {
  const permissionStore = usePermissionStore();

  /**
   * 确定是否有权限
   * @param value
   * @param def 权限默认值，默认为有权限
   */
  function hasPermission(value?: string | string[], def = true): boolean {
    // 默认有权限
    if (!value) {
      return def;
    }

    const allCodeList: string[] = permissionStore.getPermCodeList;
    if (!isArray(value)) {
      return allCodeList.includes(value);
    }
    return (intersection(value, allCodeList) as string[]).length > 0;
  }

  return { hasPermission };
}
