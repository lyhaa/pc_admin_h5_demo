// 根据环境引入不同配置 process.env.VUE_APP_ENV
const environment = process.env.VUE_APP_ENV || 'production'
const config = require('./env.' + environment)
config.isProxy = process.env.VUE_APP_ISPROXY === 'true' //是否使用代理
config.version = require('./version.js')(environment) //版本号
module.exports = config
