<template>
  <div class="layout">
    <!-- 左侧导航栏 -->
    <MyMenu v-show="role === 'admin'" class="menu" :isCollapse="isCollapse" />
    <MyMenu1 v-show="role === 'author'" class="menu" :isCollapse="isCollapse" />
    <!-- 右侧内容 -->
    <Content
      class="content"
      @changeCollapse="changeCollapse"
      :isCollapse="isCollapse"
      :class="{ isActive: isCollapse }"
    />
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import MyMenu1 from "./MyMenu1.vue";
import Content from "./Content.vue";
export default {
  data() {
    return {
      isCollapse: false,
      role: JSON.parse(window.localStorage.getItem("user")).user_identity,
    };
  },
  components: {
    MyMenu,
    Content,
    MyMenu1,
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  .menu {
    background: #465c8b;
    //一般用于导航栏吸顶效果,搭配top,bottom,left,right使用
    /* 注意点：
      1、必须设置width；
      2、跟父级盒子无关，它是以屏幕为准
    */
    position: fixed;
    top: 0;
    bottom: 0;
    border: none;
  }
  .content {
    // flex: 1;
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>
