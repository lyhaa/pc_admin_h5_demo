import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import router from "@/router/index"
import { uuid, isEmptyObj, toStrParams, getRequestParams,argumentsSort } from '@/utils/index'
import md5 from 'js-md5'
// 根据环境不同引入不同api地址
import { baseApi, isProxy , version } from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: isProxy ? '/api' : baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers:{
    'Content-Type':'application/json;charset=UTF-8'
  }
})
let tokenAbnormal = false;
const loginOutStatus = {
  'SC_UNAUTHORIZED':true,
  'IS_DELETE':true
}
function toastErrorMsg(msg,isAstrictToast = true){
  if (!tokenAbnormal) {
    tokenAbnormal = true
    // 弹出框
    // Toast.fail(msg);
    Toast(msg)
    // 设置定时器，确保下次异常时弹出框正常弹出
    if(isAstrictToast){
      const times = setTimeout(() => {
        tokenAbnormal = false;
        clearTimeout(times);
      }, 2000);
    }else{
      tokenAbnormal = false;
    }
  }
}

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    // 登录超时,重新登录
    if (res.errorCode == '401') {
        store.dispatch('logOut',{isLogOut:true,errorMsg:res.errorMsg})
        return new Promise(()=>{})
      } else {
        if(res.success){
          return Promise.resolve(res)
        }else{
          res.errorMsg && toastErrorMsg(res.errorMsg,response.config.isAstrictToast)
          return new Promise(()=>{})
      }
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
