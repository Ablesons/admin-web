/**
 * @Description:
 * @Author: Ableson
 * @Date: 2022/3/27 15:21
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 15:21
 */
import { $post } from '/@/utils/http';

/**
 * 登录
 * @param params
 */
export const apiLogin = (params: any) =>
  $post({
    url: '/sys/twbUser/login',
    params: params,
  });

/**
 * 通过token登录
 */
export const apiLoginByToken = () =>
  $post({
    url: '',
  });

/**
 * 退出登录
 */
export const apiLogOut = () =>
  $post({
    url: '/sys/twbUser/logOut',
  });
