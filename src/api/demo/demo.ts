import { Result } from '/@/model/baseModel';
import { DemoSearchResultModel, DemoDetailResultModel } from './model/demoModel';
import { ContentTypeEnum, RequestParams } from '/@/constant/http';
import { $delete, $exportExcel, $get, $post, $put } from '/@/utils/http';

/**
 * 分页查询
 * @param searchParams
 * @returns
 */
export const apiDemoSearch = (searchParams: RequestParams) =>
  $get<DemoSearchResultModel>({
    url: '',
    params: searchParams,
  });

/**
 * 根据主键获取详情
 * @param id
 * @returns
 */
export const apiDemoGetById = (id: string) =>
  $get<DemoDetailResultModel>({
    url: '',
    params: { id: id },
  });

/**
 * 新增
 * @param searchParams
 * @returns
 */
export const apiDemoSave = (saveParams: RequestParams) =>
  $post<Result<string>>({
    url: '/sys/twbUser/login',
    params: saveParams,
    contentType: ContentTypeEnum.form,
  });

/**
 * 根据主键更新
 * @param updateParams
 * @returns
 */
export const apiDemoUpdateById = (updateParams: RequestParams) =>
  $put({
    url: '',
    params: updateParams,
  });

/**
 * 根据主键删除
 * @param id
 * @returns
 */
export const apiDemoDeleteById = (id: string) =>
  $delete({
    url: '',
    params: { id: id },
  });

/**
 * 根据主键集合批量删除
 * @param ids
 * @returns
 */
export const apiDemoBatchDeleteByIds = (ids: Array<String>) =>
  $delete({
    url: '',
    params: { ids: ids },
  });

/**
 * 根据主键逻辑删除
 * @param id
 * @returns
 */
export const apiDemoLogicDeleteById = (id: string) =>
  $put({
    url: '',
    params: { id: id },
  });

/**
 * 根据主键集合批量逻辑删除
 * @param ids
 * @returns
 */
export const apiDemoLogicBatchDeleteByIds = (ids: Array<String>) =>
  $put({
    url: '',
    params: { ids: ids },
  });

/**
 * 根据查询条件导出Excel
 * @param searchParams
 * @returns
 */
export const apiDemoExportExcel = (searchParams: any) =>
  $exportExcel({
    url: '',
    params: searchParams,
  });
