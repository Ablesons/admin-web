import { Result } from '/@/model/baseModel';
import { $post } from '/@/utils/http';

/**
 * 查询缓存数据
 * @returns
 */
export const apiCacheSearchList = () =>
  $post<Result<any>>({
    url: '/common/getCacheData',
  });

/**
 * 刷新缓存数据
 * @returns
 */
export const apiCacheRefresh = () =>
  $post<Result<any>>({
    url: '/common/refreshCacheData',
  });
