import router from "./index";
//获取vuex数据
import store from "../store/index";
//路由拦截
router.beforeEach((to, from, next) => {
  /* console.log("上个页面", from);
  console.log("下个页面", to); */
  //判断是否需要登录
  if (to.matched.some((ele) => ele.meta.isLogin)) {
    let token = store.state.loginModule.userinfo.token;
    //判断是否已经登录
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
