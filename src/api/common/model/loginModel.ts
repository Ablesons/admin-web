/**
 * @Description: 登录用户
 * @Author: Ableson
 * @Date: 2022/3/27 15:37
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/27 15:37
 */
import { Result } from '/@/api/baseModel';
import { IUserState } from '/#/store';

export type LoginUserModel = IUserState;

/**
 * 登录用户返回结果
 */
export type LoginUserResultModel = Result<LoginUserModel>;
