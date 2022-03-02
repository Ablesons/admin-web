/**
 * @Description: 页面操作类
 * @Author: Ableson
 * @Date: 2022/3/2 16:43
 * @LastEditors: Ableson
 * @LastEditTime: 2022/3/2 16:43
 */
import { unref } from 'vue';
import { RouteLocationRaw, Router, useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/verify';
import { REDIRECT_NAME } from '/@/router/constant';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function errorLog(e: Error) {
  console.error(e);
}
// 页面切换
export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(errorLog) : push(opt).catch(errorLog);
    } else {
      const option = opt as RouteLocationRaw;
      isReplace ? replace(option).catch(errorLog) : push(option).catch(errorLog);
    }
  }
  return go;
}

// 刷新当前页面
export function useRefresh(_router?: Router) {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
}
