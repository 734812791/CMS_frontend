
//路由守卫
import router from "./index.js"
import store from "../store"

//免登录访问白名单
const whiteList = ["/login",'/register']

router.beforeEach((to, from, next) => {
  if (store.state.token) {//有token，表示登录过
    if (to.path === "/login") {
      //若输入的是登录地址，则直接弹到主页
      next("/index")
    } else {
      next();
    }
  } else {
    //没有登录过
    //先过滤白名单
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login")
    }

  }
})
