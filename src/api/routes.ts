import { $get, $post } from '/@/utils/http';

interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// 获取验证码
export const getVerify = (): userType =>
  $get({
    url: '/captcha',
  });

// 登录
export const getLogin = (data: object) =>
  $post({
    url: '/login',
    data,
  });

// 刷新token
export const refreshToken = (data: object) =>
  $post({
    url: '/refreshToken',
    data,
  });
