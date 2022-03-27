/*
 * @Description: 定义模型
 * @Author: DHL
 * @Date: 2021-12-23 09:47:45
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-23 12:00:44
 */
import { Result, ResultPage } from '/@/model/baseModel';

/**
 * 业务模型
 */
export interface DemoModel {
  id: string;
  name: string;
  address: string;
}

/**
 * 分页查询返回结果
 */
export type DemoSearchResultModel = ResultPage<DemoModel>;

/**
 * 详情查询返回结果
 */
export type DemoDetailResultModel = Result<DemoModel>;
