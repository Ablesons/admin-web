import { LoginUserResultModel } from './model/loginModel';
import { ContentTypeEnum, RequestParams } from '/@/constant/http';
import { Result } from '/@/model/baseModel';
import { $post } from '/@/utils/http';

/**
 * 登录
 * @param params
 * @returns
 */
export const apiLogin = (params: RequestParams) =>
  $post<LoginUserResultModel>({
    url: '/common/login',
    params: params,
    contentType: ContentTypeEnum.form,
  });

/**
 * 通过token登录
 */
export const apiLoginByToken = () =>
  $post<LoginUserResultModel>({
    url: '/common/loginByToken',
  });

/**
 * 退出登录
 * @returns
 */
export const apiLogOut = () =>
  $post<Result<string>>({
    url: '/common/logOut',
  });
