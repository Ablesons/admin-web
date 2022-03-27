import { RequestParams } from '/@/constant/http';

//////////////////////////////////////////////////
// 基础对象
//////////////////////////////////////////////////
/**
 * 基础对象
 */
export interface BaseModel {
  /**
   * 创建人主键
   */
  creatorId?: Nullable<string>;

  /**
   * 创建人名称
   */
  creator?: Nullable<string>;

  /**
   * 创建时间
   */
  createDate?: Nullable<Date>;

  /**
   * 更新人主键
   */
  updaterId?: Nullable<string>;

  /**
   * 更新人名称
   */
  updater?: Nullable<string>;

  /**
   * 更新时间
   */
  updateDate?: Nullable<Date>;
}

//////////////////////////////////////////////////
// 接口返回结果
//////////////////////////////////////////////////

/**
 * 接口返回结果
 */
export interface Result<T> {
  /**
   * 标记是否成功
   */
  success: boolean;

  /**
   * 返回状态码，默认200.前端需要拦截一些常见的状态码如403、404、500等
   */
  status: number;

  /**
   * 编码，可用于前端处理多语言，不需要则不用返回编码
   */
  code: string;

  /**
   * 返回消息
   */
  message: string;

  /**
   * 返回数据
   */
  data?: Nullable<T>;
}

/**
 * 分页模型
 */
interface PageInfoModel<T> {
  /**
   * 总页数
   */
  pages: number;

  /**
   * 每页行数
   */
  pageSize: number;

  /**
   * 当前页
   */
  pageNum: number;

  /**
   * 总记录数
   */
  total: number;

  /**
   * 结果集
   */
  list: Array<T>;
}

/**
 * 分页查询接口返回类型
 */
export type ResultPage<T> = Result<PageInfoModel<T>>;

//////////////////////////////////////////////////
// 查询参数
//////////////////////////////////////////////////

/**
 * 基础参数
 */
export type Params = RequestParams;

/**
 * 分页查询基础参数
 */
export interface PageParams extends Params {
  /**
   * 当前页
   */
  pageNum: number;

  /**
   * 每页的数量
   */
  pageSize: number;

  /**
   * 排序列
   */
  sort: string;

  /**
   * 排序方式
   * desc | asc
   */
  order: string;

  /**
   * 分页查询成功后回调
   * emit的回调
   */
  callback: Function;
}
