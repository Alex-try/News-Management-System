<template>
  <div>
    <el-menu
      default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#465C8B"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item><span>VOC新闻管理系统</span></el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/personalcenter">
        <i class="el-icon-document"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/adminuser">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/admintopic">
        <i class="el-icon-setting"></i>
        <span slot="title">专题管理</span>
      </el-menu-item>
      <el-submenu index="/checknews">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>审核新闻</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/checknews/checked">已审核</el-menu-item>
          <el-menu-item index="/checknews/uncheck">未审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/feedback">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:['isCollapse']
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>