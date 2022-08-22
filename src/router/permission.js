import router from "./index";
//获取vuex数据
import store from "../store/index";
//路由拦截
router.beforeEach((to, from, next) => {
  /* console.log("上个页面", from);
  console.log("下个页面", to); */
  // console.log(store.state.loginModule.userinfo.token);
  //判断是否需要登录
  if (to.matched.some((ele) => ele.meta.isLogin)) {
    let token = store.state.loginModule.userinfo.token;
    //判断是否已经登录
    if (token) {
      if (to.meta.roles.length !== 0) {
        let role = JSON.parse(
          window.localStorage.getItem("user")
        ).user_identity;
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role === to.meta.roles[i]) {
            next();
            break;
          }
          if (i === to.meta.roles.length - 1) {
            next({ path: "/nopermission" });
          }
        }
      } else {
        next();
      }
    } else {
      next("/login");
      alert("请先登录！！！");
    }
  } else {
    next();
  }
});
