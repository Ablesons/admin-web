import { BaseModel, PageParams, Params, Result, ResultPage } from '/@/model/baseModel';

/**
 * 平台管理对象
 */
export interface PlatformModel extends BaseModel {
  /**
   * 主键
   */
  id?: string;

  /**
   * 编码
   */
  code: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 有效状态（0：无效；1：有效）
   */
  status: string;
}

//////////////////////////////////////////////////
// 参数
//////////////////////////////////////////////////

/**
 * 查询参数
 */
export interface PlatformParams extends Params {
  /**
   * 关键字模糊查询
   */
  queryLikeStr: string;
}

/**
 * 分页查询参数
 */
export interface PlatformPageParams extends PlatformParams, PageParams {}

//////////////////////////////////////////////////
// 返回结果
//////////////////////////////////////////////////

/**
 * 分页查询返回结果
 */
export type PlatformPageResultModel = Nullable<ResultPage<PlatformModel>>;

/**
 * 详情查询返回结果
 */
export type PlatformResultModel = Nullable<Result<PlatformModel>>;
