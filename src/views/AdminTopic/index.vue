<template>
  <div class="admintopic">
      <!-- 搜索框 -->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <el-button type="primary" plain>添加</el-button>
    </div>
    <!-- 专题列表（包含编号，专题名，状态，编辑，删除 -->
    <div class="wrapper">
      <el-table :data="tableData" stripe>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="no" label="编号" width="220">
        </el-table-column>
        <el-table-column prop="name" label="专题名" width="220">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="220">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button class="init" size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
  </div>
</template>

<script>
export default {
data() {
    return {
      input: "",
      tableData: [
        {
          no:'001',
          name: '科技',
          state:'正常'
        },
        {
          no:'002',
          name: '军事',
          state:'正常'
        },
      ],
    };
  },
  methods: {
    handleEdit(){

    },
    handleDelete(){

    },
  },
}
</script>

<style lang="less" scoped>
.admintopic {
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
    .init{
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
}
</style>