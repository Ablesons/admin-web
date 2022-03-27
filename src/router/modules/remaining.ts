const Layout = () => import('/@/layout/index.vue');

const remainingRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/basis/login.vue'),
    meta: {
      title: '登录',
      showLink: false,
      i18n: true,
      rank: 101,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      icon: 'home-filled',
      title: '首页',
      i18n: true,
      showLink: false,
      rank: 104,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('/@/layout/redirect.vue'),
      },
    ],
  },
];

export default remainingRouter;
