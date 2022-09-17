<template>
  <div>
    <el-menu
      default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#0e5754"
      text-color="#fff"
      active-text-color="#c9dd22"
      router
      style="border: none; height: 100%"
      :collapse="isCollapse"
    >
      <el-menu-item><span>VOC新闻管理系统</span></el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/personalinfo">
        <i class="el-icon-document"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/writenews">
        <i class="el-icon-edit"></i>
        <span slot="title">撰写新闻</span>
      </el-menu-item>
      <el-menu-item index="/applyrecord">
        <i class="el-icon-finished"></i>
        <span slot="title">申请记录</span>
      </el-menu-item>
      <el-menu-item index="/draftbox">
        <i class="el-icon-takeaway-box"></i>
        <span slot="title">草稿箱</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
