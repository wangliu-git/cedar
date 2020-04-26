// 写路由器组件的模块
import Vue from "vue"
import VueRouter from 'vue-router'
import routes from "./routes";
Vue.use(VueRouter)
// export default new VueRouter({
//   mode:'history', //路由模式，没有#
//   routes,
//   // scrollBehavior(){
//   //   return {x:0,y:0}
//   // }
// })
const router = new VueRouter({
  mode:'history', //路由模式，没有#
  routes,
  // scrollBehavior(){
  //   return {x:0,y:0}
  // }
})


//路由导航守卫
router.beforeEach((to, from, next) => {
  // to  将要访问的路径
  // from  代表从哪个路径跳转
  // next  是一个函数，表示放行
      // next() 直接放行    next('/login')强制跳转
  if (to.path === '/login') return next()
  // // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // // 不存在token 跳转
  if (!tokenStr) return next('/login')
  next()
})
export default router











