// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueResource from 'vue-resource'
import './plugins/element.js'
import '../public/js/macarons '
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



// 导入全局文件
import './assets/css/global.css'

// axios
import axios from 'axios'
// 挂载axios
Vue.prototype.axios= axios
var baseURLStr = window.g.ApiUrl
var getURLStr = window.g.getURL

// 创建axios实例
const service = axios.create({
  baseURL: baseURLStr, // api的base_url
  timeout: 5000, // 请求超时时间
  geturl: getURLStr
})
axios.defaults.baseURL = baseURLStr
axios.defaults.geturl = getURLStr

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


