import { Result } from '/@/model/baseModel';

export interface LoginUserModel {
  id: Nullable<string>;
  ip: Nullable<string>;
  loginName: Nullable<string>;
  name: Nullable<string>;
  userType: Nullable<string>;

  /**
   * 用户状态（0，失效；1，生效）
   */
  status: Nullable<number>;

  /**
   * 是否第一次登录（0，否；1，是）
   */
  firstLogin: Nullable<number>;

  /**
   * 用户所属组织机构
   */
  organizations: Nullable<object[]>;

  /**
   * 用户角色
   */
  roles: Nullable<object[]>;

  /**
   * 用户拥有的权限
   */
  resources: Nullable<object[]>;

  /**
   * 头像
   */
  avatar: Nullable<string>;

  /**
   * 简介
   */
  introduction: Nullable<string>;

  /**
   * 令牌
   */
  token: Nullable<string>;
}

/**
 * 登录用户返回结果
 */
export type LoginUserResultModel = Result<LoginUserModel>;
