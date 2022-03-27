import { $get, $post, $put } from '/@/utils/http';
import {
  CodeGenModel,
  CodeGenPageParams,
  CodeGenPageResultModel,
  CodeGenResultModel,
} from './model/codeGenModel';
import { ContentTypeEnum } from '/@/constant/http';
import { Result } from '/@/model/baseModel';

/**
 * 分页查询
 */
export const apiCodeGenSearch = (searchParams: CodeGenPageParams) =>
  $get<CodeGenPageResultModel>({
    url: '/gen/twbCodeGen/search',
    params: searchParams,
  });

/**
 * 根据ID获取详情
 */
export const apiCodeGenGetById = (id: string) =>
  $get<CodeGenResultModel>({
    url: '/gen/twbCodeGen/getById',
    params: { id: id },
  });

/**
 * 保存信息
 */
export const apiCodeGenSave = (saveParams: CodeGenModel) =>
  $post<CodeGenResultModel>({
    url: '/gen/twbCodeGen/save',
    contentType: ContentTypeEnum.json,
    params: saveParams,
  });

/**
 * 更新信息
 */
export const apiCodeGenUpdateById = (updateParams: CodeGenModel) =>
  $put<CodeGenResultModel>({
    url: '/gen/twbCodeGen/updateById',
    contentType: ContentTypeEnum.json,
    params: updateParams,
  });

/**
 * 根据ID删除信息
 */
export const apiCodeGenDeleteById = (id: string) =>
  $post<CodeGenResultModel>({
    url: '/gen/twbCodeGen/deleteById',
    params: { id: id },
  });

/**
 * 批量删除信息
 */
export const apiCodeGenBatchDeleteByIds = (ids: string) =>
  $post<CodeGenResultModel>({
    url: '/gen/twbCodeGen/batchDeleteByIds',
    params: { ids: ids },
  });

/**
 * 根据ID逻辑删除信息
 */
export const apiCodeGenLogicDeleteById = (id: string) =>
  $post<CodeGenResultModel>({
    url: '/gen/twbCodeGen/logicDeleteById',
    params: { id: id },
  });

/**
 * 批量逻辑删除
 */
export const apiCodeGenLogicBatchDeleteByIds = (ids: string) =>
  $post<CodeGenResultModel>({
    url: '/gen/twbCodeGen/logicBatchDeleteByIds',
    params: { ids: ids },
  });

/**
 * 查询所有表、视图
 * @param queryLikeStr
 * @returns
 */
export const apiCodeGenSearchTables = (queryLikeStr: string) =>
  $get<Result<any>>({
    url: '/gen/twbCodeGen/searchTables',
    params: { queryLikeStr: queryLikeStr },
  });

/**
 * 查询列信息
 * @param tableName
 * @returns
 */
export const apiCodeGenSearchColumns = (tableName: string) =>
  $get<Result<any>>({
    url: '/gen/twbCodeGen/searchColumns',
    params: { tableName: tableName },
  });

/**
 * 查询数据字典TYPE_CODE
 * @returns
 */
export const apiCodeGenSearchDataDicKey = () =>
  $get<Result<any>>({
    url: '/gen/twbCodeGen/searchDataDicKey',
  });

/**
 * 项目列表查询
 * @returns
 */
export const apiCodeGenSearchProjectList = () =>
  $get<Result<any>>({
    url: '/sys/twbProject/list',
  });

/**
 * 查询资源树
 * @param projectId
 * @returns
 */
export const apiCodeGenSearchResourceTree = (projectId: string) =>
  $get<Result<any>>({
    url: '/sys/twbResource/searchTree',
    params: {
      projectId: projectId,
    },
  });
