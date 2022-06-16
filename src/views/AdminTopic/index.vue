<template>
  <div class="admintopic">
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="searchInp"
      ></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <el-button type="primary" plain @click="dialogFormVisible = true"
        >添加</el-button
      >
      <!-- 弹出的添加专题表单 -->
      <el-dialog title="添加专题" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            label="专题名称"
            prop="topic_name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.topic_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 专题列表（包含编号，专题名，状态，编辑，删除 -->
    <div class="wrapper">
      <el-table :data="tableData" stripe>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="topic_id" label="编号" width="220">
        </el-table-column>
        <el-table-column prop="topic_name" label="专题名" width="220">
        </el-table-column>
        <el-table-column prop="topic_state" label="状态" width="220">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button
              class="init"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <MyPagination
      :total="total"
      :pageSize="pageSize"
      @changePage="changePage"
      v-show="flag"
    />
  </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      total: 1,
      pageSize: 1,
      flag: true,
      dialogFormVisible: false,
      form: {
        topic_name: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    MyPagination,
  },
  methods: {
    // 分页页码，当前页码改变，获取的数据也不同
    changePage(num) {
      this.http(num - 1);
    },
    // 获取专题列表数据
    http(page) {
      this.$api
        .getTopicList({
          page,
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        });
    },
    searchInp(val) {
      // console.log(val)
      this.$api.topicSearch({ search: val }).then((res) => {
        console.log(res.data.result);
        this.tableData = res.data.result;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      });
      this.flag = false;
      if (val == "") {
        this.flag = true;
        this.http(0);
      }
    },
    handleEdit() {},
    handleDelete(row) {
      this.$confirm("此操作将删除此专题，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.topic_id);
          this.$api.delTopic({ topic_id: row.topic_id }).then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              //视图更新
              this.http(0);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    submitForm() {
      let topic_name = this.form;
      this.$api.addTopic(topic_name).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.http(0);
        }else{
          this.$message({
            type: "info",
            message: res.data.msg,
          });
        }
      });
    },
  },
  created() {
    this.http(0);
  },
};
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
    .init {
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
}
</style>