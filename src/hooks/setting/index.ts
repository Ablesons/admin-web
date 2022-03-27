/*
 * @Description: 配置
 * @Author: DHL
 * @Date: 2021-12-14 13:38:05
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-21 14:11:50
 */
import setting from '/@/hooks/setting/setting';
import layoutSetting from '/@/hooks/setting/layout';
import { appAuth, networkConfig } from '/@/hooks/setting/network';

export const useSetting = setting();
export const useLayoutSetting = layoutSetting();
export const useAppAuth = appAuth();
export const useNetworkConfig = networkConfig();
