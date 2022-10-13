// 本地环境配置
module.exports = {
  title: '管理后台',
  baseUrl: 'http://xxx.com:9000', // 项目地址
  baseApi: process.env.VUE_APP_Api || 'http://xxx:30000', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  brandApi: process.env.VUE_APP_Api ? (process.env.VUE_APP_Api +'/' ): 'http://xxx:30000/',
  brandH5Api: 'http://xxxx:9003/pinpai/#/',
  websocketApi: 'ws://xxx.com:8085',
  greyDomain: 'http://xxx.com',//灰度地址
  $cdn: 'https://xxx.cn/',
}
