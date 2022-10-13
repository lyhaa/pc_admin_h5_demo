/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
      '"}'
  )
}

/*
  生成uuid
*/
export function uuid() {
  
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  
  var uuid = s.join("");
  localStorage.setItem('IMEI',uuid)
  
  return uuid;
}
/*
  判断对象是否为空
*/
export function isEmptyObj(data){
  const keys = Object.keys(data || {})
  return keys.length === 0
}

/**
 * 将json对象转为以&拼接的字符串
 * @param 操作对象
 */
export function toStrParams (param) {
  var result = ''
  for (let name in param) {
    if (typeof param[name] !== 'function' && param[name] !== 'undefined') {
      // result += '&' + name + '=' + (param[name] === '' ? param[name] : encodeURI(param[name]))
      result += '&' + name + '=' + param[name]
    }
  }
  return JSON.stringify(param) !== '{}' ? result.substring(1) : ''
}

/**
 * 把对象按照属性名的字母顺序进行排列
 * @obj 要排序的操作对象
 */
export function objKeySort (obj) {
  if (JSON.stringify(obj) === '{}') {
    return {}
  } else {
    var newkey = Object.keys(obj).sort()
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]] // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj // 返回排好序的新对象
  }
}

/**
 * 获取url问号后面的参数对象, 返回排序完的字符串和对象
 * @url 地址
 */
 export function getRequestParams (url) {
  let requestObject = {}
  let requestStr = ''
  // 获取url中"?"符后的字串
  if (url.indexOf('?') !== -1) {
    const strs = url.substr(1).split('?')[1].split('&').sort()
    requestStr = strs.join('&')
    for (let i = 0; i < strs.length; i++) {
      requestObject[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return { requestObject, requestStr }
}

export function argumentsSort(data){
  const type = Object.prototype.toString.call(data)
  return (type === '[object Object]') ? objKeySort(data) : objKeySort(JSON.parse(data || '{}'))
}
//路由权限数据扁平化
export function routerFlatten(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const subList = arr[index].subList || []
    if (Array.isArray(element) || Array.isArray(subList)) {
      arr = [].concat([...arr, ...subList])
    }
  }
  return arr.reduce((obj, item) => {
    if (item.link) {
      let path = item.link.replace('/main','')
      obj[path] = true
      obj['/' +path.split('/')[1]] = true
      // let itemPath = '';
      // (path || "").split('/').filter(Boolean).forEach(item=>{
      //   itemPath += ('/'+item)
      //   obj[itemPath] = true
      // })
    }
    return obj
  }, {})
}

//获取sessionStorage值
export const sessionStorageGet = (name) => {
  if (typeof name !== 'string') {
    return
  }
  var savedStr = sessionStorage.getItem(name)
  // 非法值返回，包括undefined、null、空字符串
  if (!savedStr) {
    return
  }
  var result
  if ((savedStr.indexOf('"') < 0 && savedStr.indexOf('\'') < 0) || savedStr.indexOf(':') < 0) {
    return savedStr
  }
  try {
    result = JSON.parse(savedStr)
    return result
  } catch (e) {
    return savedStr
  }
}
export function isToken(){
  return !!sessionStorageGet('token')
}

let parentPath = ''
//权限筛选
export function rermissFilter(data,menuPermiss,path = ''){
  const fData = data.filter(item=>{
    item.parentPath = (parentPath ?parentPath : path) + ((item.path && !item.sort ) ? '/'+item.path : '')
    if(item.children && item.children.length){
      parentPath = item.parentPath ?item.parentPath : path
      item.children = rermissFilter(item.children,menuPermiss,item.path)
    }
    if(menuPermiss[item.parentPath || item.path]){
      return item
    }
  })
  return fData
}