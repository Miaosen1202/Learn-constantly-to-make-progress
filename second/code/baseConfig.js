//  注意：   axios.create() 方法，调用的返回值，是一个新的 axios 实例，在 调用 create 函数的时候，可以初始化一些默认配置项，比如，请求的 baseURL 地址
Vue.prototype.$http = axios.create({
  baseURL: 'http://39.106.32.91:3000'
})