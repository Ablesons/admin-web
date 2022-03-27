import { BaseModel, PageParams, Params, Result, ResultPage } from '/@/model/baseModel';

/**
 * 平台管理对象
 */
export interface CodeGenModel extends BaseModel {
  /**
   * 主键
   */
  id?: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 类名
   */
  className: string;

  /**
   * 表名
   */
  tableName: string;

  /**
   * 表描述
   */
  tableComment: string;

  /**
   * 包名
   */
  packageName: string;

  /**
   * 前端页面路径
   */
  viewPath: string;

  /**
   * 删除前缀
   */
  delPrefix: string;

  /**
   * 功能描述
   */
  genName: string;

  /**
   * 生成人
   */
  genAuthor: string;

  /**
   * 生成类型（1：压缩包；2：物理路径）
   */
  genType: string;

  /**
   * 所属项目ID
   */
  projectId: string;

  /**
   * 父级菜单ID
   */
  resourceId: string;

  /**
   * 父级菜单名称
   */
  resourceName: string;

  /**
   * 数据源编码
   */
  datasourceCode: string;

  /**
   * 其他配置
   */
  optionsJson: object;

  /**
   * 备注
   */
  remark: string;
}

//////////////////////////////////////////////////
// 参数
//////////////////////////////////////////////////

/**
 * 查询参数
 */
export interface CodeGenParams extends Params {
  /**
   * 关键字模糊查询
   */
  queryLikeStr: string;
}

/**
 * 分页查询参数
 */
export interface CodeGenPageParams extends CodeGenParams, PageParams {}

//////////////////////////////////////////////////
// 返回结果
//////////////////////////////////////////////////

/**
 * 分页查询返回结果
 */
export type CodeGenPageResultModel = Nullable<ResultPage<CodeGenModel>>;

/**
 * 详情查询返回结果
 */
export type CodeGenResultModel = Nullable<Result<CodeGenModel>>;
