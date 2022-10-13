/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录页', keepAlive: false }
  },
  {
    name: 'noRights',
    path: '/noRights',
    component: () => import('@/views/noRights.vue')
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/notFound.vue')
  },
]
