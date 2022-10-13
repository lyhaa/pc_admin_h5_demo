import { Dialog } from 'vant';
import router from '@/router'
import { routerFlatten, isToken, sessionStorageGet, rermissFilter } from '@/utils'
const state = {
  userName: '',
  isLogOut:false,
  menuPermiss:{},
  routerPermissList:[],
  menuList:[],
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_ROUTER_PERMISS_LIST(state, data) {
    state.routerPermissList = data.sort((a,b)=>a.sort - b.sort)
  },
  SET_MENU_PERM(state, {data,isToHome}) {
    state.menuPermiss = data ||{}
    state.menuList = rermissFilter(state.routerPermissList,state.menuPermiss)
    state.menuList && state.menuList.length && state.menuList.forEach(item=>{
      router.addRoute(item)
    })
    router.addRoute({path:'*',redirect:'/404'})
    isToHome && router.push({path:'/index/dataToday'})
  },
  LOG_OUT(state, {isLogOut,errorMsg}){
    state.isLogOut = isLogOut
    Dialog.alert({
      title: '登陆提示！',
      message: errorMsg,
    }).then(() => {
      sessionStorage.removeItem('token');
      state.isLogOut = false
    });
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  logOut({ commit }, data) {
    commit('LOG_OUT',data)
  },
  //获取权限菜单处理
  getMenuList({ commit }, isToHome){
    if(!isToken()) return;
    router.app.Apis.getMenuListData()
    .then(res=>{
      const { menuList = [] } = res.data
      commit('SET_MENU_PERM',{data:routerFlatten(menuList),isToHome})
    })
  }
}
export default {
  state,
  mutations,
  actions
}
