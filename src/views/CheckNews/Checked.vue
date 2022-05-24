<template>
  <div class="checked">
    <div class="wrapper">
      <el-table :data="tableData" stripe>
        <el-table-column prop="news" label="新闻" width="350">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="200">
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="220">
        </el-table-column>
        <el-table-column prop="reviewer" label="审核人" width="200">
        </el-table-column>
        <el-table-column prop="reviewTime" label="审核时间" width="220">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              class="init"
              size="mini"
              @click="check(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          news: "承诺函肯定会",
          author: "王小波",
          applyTime: "2022-05-21 16:00",
          reviewer: "王小波",
          reviewTime: "2022-05-21 16:03",
        },
      ],
    };
  },
  methods: {
    check() {},
  },
};
</script>

<style lang="less" scoped>
.checked {
  margin: 20px;
  .header {
    display: flex;
    button {
      margin-left: 20px;
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
  .wrapper {
    margin: 20px 0;
    .init {
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
}
</style>