import { $get, $post, $put } from '/@/utils/http';
import {
  PlatformModel,
  PlatformPageParams,
  PlatformPageResultModel,
  PlatformResultModel,
} from './model/platformModel';
import { ContentTypeEnum } from '/@/constant/http';

/**
 * 分页查询
 */
export const apiPlatformSearch = (searchParams: PlatformPageParams) =>
  $get<PlatformPageResultModel>({
    url: '/system/twbPlatform/search',
    params: searchParams,
  });

/**
 * 根据ID获取详情
 */
export const apiPlatformGetById = (id: string) =>
  $get<PlatformResultModel>({
    url: '/system/twbPlatform/getById',
    params: { id: id },
  });

/**
 * 保存信息
 */
export const apiPlatformSave = (saveParams: PlatformModel) =>
  $post<PlatformResultModel>({
    url: '/system/twbPlatform/save',
    contentType: ContentTypeEnum.json,
    params: saveParams,
  });

/**
 * 更新信息
 */
export const apiPlatformUpdateById = (updateParams: PlatformModel) =>
  $put<PlatformResultModel>({
    url: '/system/twbPlatform/updateById',
    contentType: ContentTypeEnum.json,
    params: updateParams,
  });

/**
 * 根据ID删除信息
 */
export const apiPlatformDeleteById = (id: string) =>
  $post<PlatformResultModel>({
    url: '/system/twbPlatform/deleteById',
    params: { id: id },
  });

/**
 * 批量删除信息
 */
export const apiPlatformBatchDeleteByIds = (ids: string) =>
  $post<PlatformResultModel>({
    url: '/system/twbPlatform/batchDeleteByIds',
    params: { ids: ids },
  });

/**
 * 根据ID逻辑删除信息
 */
export const apiPlatformLogicDeleteById = (id: string) =>
  $post<PlatformResultModel>({
    url: '/system/twbPlatform/logicDeleteById',
    params: { id: id },
  });

/**
 * 批量逻辑删除
 */
export const apiPlatformLogicBatchDeleteByIds = (ids: string) =>
  $post<PlatformResultModel>({
    url: '/system/twbPlatform/logicBatchDeleteByIds',
    params: { ids: ids },
  });
