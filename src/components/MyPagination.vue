<template>
  <div class="mypagination">
    <el-pagination
      background
      class="pagination"
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:10
        }
    },
    methods: {
        changePage(page){
            this.$emit("changePage",page)
        }
    },
};
</script>

<style lang="less" scoped>
.mypagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.pagination{
    height: 50px;
    background: #a0cc87;
    border-radius: 10px;
    display: flex;
    align-items: center;
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #a2b498;
    }
}

</style>