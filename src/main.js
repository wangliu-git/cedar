// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueResource from 'vue-resource'
import './plugins/element.js'
import '../public/js/macarons.js'
import 'element-ui/lib/theme-chalk/index.css';

// 入口文件
import ElementUI from 'element-ui'


import echarts from 'echarts'

Vue.prototype.$echarts = echarts
// 引入基本模板

// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')



// const data = config.data
// // 判断data的属性  如果是对象转换成ulencode的字符串
// if (data instanceof Object) {
//    config.data = qs.stringify(data)

// }


// 导入全局文件
import './assets/css/global.css'

// axios
import axios from 'axios'
// 挂载axios
// Vue.prototype.$http = axios

axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://192.168.75.58/cedar/api'
// http://192.168.75.58/cedar/api/report/onedata.php

// http://106.13.49.232


// // 请求头拦截
// axios.interceptors.request.use(config => {
//   NProgress.start()
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

// axios.interceptors.response.use(config => {
//   NProgress.done()
//   return config
// })
Vue.use(VueResource)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
