//首页模块路由
export default [
    {
        sort:1,
        path: '/index',
        component: () => import('@/views/layouts/index'),
        redirect: '/index/dataToday',
        meta: {
          title: '首页',
          keepAlive: false
        },
        children: [
          {
            path: 'dataToday',
            name: 'DataToday',
            component: () => import('@/views/home/index'),
            meta: { title: '首页', keepAlive: false }
          },
        ],
    },
]