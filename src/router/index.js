import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import { isToken } from '@/utils'
import store from '@/store'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()
//获取所有路由
const context = require.context('./modules', true, /\.js$/);
let allRouters = []
context.keys().forEach((key) => {
  allRouters = [...allRouters,...(context(key).default || [])]
});
store.commit('SET_ROUTER_PERMISS_LIST',allRouters)
// console.log(allRouters.sort((a,b)=>a.sort - b.sort));

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

//路由拦截登陆   
router.beforeEach((to, from, next) => {
  if (['/login'].includes(to.path)) {
    next()
  } else {
    if (!isToken()) {
      if(to.query.grey){
        next()
      }else{
          next({ path: '/login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  }

})
export default router
