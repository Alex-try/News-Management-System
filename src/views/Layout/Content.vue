<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <!-- 图标 -->
      <i 
        class="iconfont icon-left" 
        style="font-size:30px;"
        @click="changeMenu"
        v-if="!isCollapse" >
      </i>
      <i 
        class="iconfont icon-right" 
        style="font-size:30px;"
        @click="changeMenu"
        v-if="isCollapse">
      </i>
      <span>admin</span>
    </div>
    <!-- 内容 -- 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeMenu(){
      this.$emit('changeCollapse')
    }
  },
  props:['isCollapse']
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: #93C178;
  .iconfont{
    color:#F7EF6A;
    font-weight: 600;
    height: 50px;
    vertical-align: middle;
  }
  span{
    width: 80px;
    position: fixed;
    right:5px;
    color: #465C8B;
    font-weight: 700;
    font-size: 18px;
  }
}
</style>