<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <!-- 图标 -->
      <i
        class="iconfont icon-left"
        style="font-size: 26px"
        @click="changeMenu"
        v-if="!isCollapse"
      >
      </i>
      <i
        class="iconfont icon-right"
        style="font-size: 26px"
        @click="changeMenu"
        v-if="isCollapse"
      >
      </i>

      <div class="user">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <i class="el-icon-user-solid" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item disabled>{{
              userinfo.user_identity
            }}</el-dropdown-item>
            <el-dropdown-item disabled>{{ userinfo.user }}</el-dropdown-item>
            <a
              target="_blank"
              href="https://github.com/Alex-try/News-Management-System.git"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="loginOut">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  background-color: #57ad58;
  .iconfont {
    color: #f7f6f6;
    font-weight: 500;
    vertical-align: middle;
  }
  .user {
    display: flex;
    align-content: space-around;
    width: 70px;
    float: right;
    cursor: pointer;
    .avatar-container {
      width: 28px;
      height: 100%;
      display: flex !important;
      padding-right: 10px;
      white-space: nowrap;
      .el-icon-user-solid {
        font-size: 25px;
        color: #f7f6f6;
      }
      .el-icon-caret-bottom {
        color: #f7f6f6;
        font-size: 15px;
      }
    }
    span {
      width: 70px;
      color: #f7f6f6;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
