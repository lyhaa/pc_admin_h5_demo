// axios
import request from '@/utils/request'

// 登录
export function login(urlData = '',data) {
  return request({
    url: '/login'+urlData,
    method: 'post',
    data,
    isAstrictToast:false,
  })
}
