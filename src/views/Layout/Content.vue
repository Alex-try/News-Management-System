<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <!-- 图标 -->
      <i
        class="iconfont icon-left"
        style="font-size: 30px"
        @click="changeMenu"
        v-if="!isCollapse"
      >
      </i>
      <i
        class="iconfont icon-right"
        style="font-size: 30px"
        @click="changeMenu"
        v-if="isCollapse"
      >
      </i>

      <div class="user">
        <span>{{ userinfo.user_identity }}</span>
        <span>{{ userinfo.user }}</span>
        <a @click="loginOut">退出登录</a>
      </div>
    </div>
    <!-- 内容 -- 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
    changeMenu() {
      this.$emit("changeCollapse");
    },
    loginOut() {
      //退出登录
      //清空vuex数据
      this.clearUser();
      //清空本地存储
      localStorage.removeItem("user");
      //返回登录
      this.$router.push("/login");
    },
  },
  props: ["isCollapse"],
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: #93c178;
  display: flex;
  .iconfont {
    color: #f7ef6a;
    font-weight: 600;
    height: 50px;
    vertical-align: middle;
  }
  .user {
    display: flex;
    align-content: space-around;
    width: 230px;
    position: fixed;
    right: 5px;
    color: #465c8b;
    font-weight: 600;
    font-size: 16px;
    span {
      width: 70px;
    }
  }
}
</style>
