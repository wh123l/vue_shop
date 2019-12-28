import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)
const Home = resolve => require(['@/components/Home'], resolve)


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径  from 从哪个路径跳转而来  next 一个函数 表示放行
  //next（） 放行   next（'/login'）强制跳转
  if(to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('user');
    next()
  }else {
    let token = window.sessionStorage.getItem('user');
    if (!token) {
      next({path: '/login'})
    }else {
      next()
    }
  }
});
export default router


