import { $get } from '/@/utils/http';

export const getAsyncRoutes = (params?: object) =>
  $get({
    url: '/getAsyncRoutes',
    params,
  });
