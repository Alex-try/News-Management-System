<template>
  <div class="adminuser">
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="searchInp"
      ></el-input>
      <el-button type="primary" plain>搜索</el-button>
      <el-button type="primary" plain>
        <router-link to="/adduser" style="color: #4a653a">添加</router-link>
      </el-button>
    </div>
    <!-- 用户列表（包含编号，姓名，身份，删除，初始化密码 -->
    <div class="wrapper">
      <el-table :data="tableData" stripe border>
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column prop="user_id" label="编号" width="220" align="center">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          width="250"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="user_identity"
          label="身份"
          width="250"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="operate" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              class="init"
              size="mini"
              align="center"
              @click="InitPsw(scope.row)"
              >初始化密码</el-button
            >
            <el-button
              size="mini"
              type="danger"
              align="center"
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
      flag: true, //搜索时为false
    };
  },
  components: {
    MyPagination,
  },
  methods: {
    InitPsw(row) {
      this.$confirm("此操作将初始化密码为：123，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.user_id);
          this.$api.initPsw({ user_id: row.user_id }).then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
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
    handleDelete(row) {
      this.$confirm("此操作将删除此人员，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.user_id);
          this.$api.delUser({ user_id: row.user_id }).then((res) => {
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
    // 分页页码，当前页码改变，获取的数据也不同
    changePage(num) {
      this.http(num - 1);
    },
    // 获取用户列表数据
    http(page) {
      this.$api
        .getUserList({
          page,
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        });
    },
    //搜索用户
    searchInp(val) {
      // console.log(val)
      this.$api.getSearch({ search: val }).then((res) => {
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
  },
  created() {
    this.http(0);
  },
};
</script>

<style lang="less" scoped>
.adminuser {
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
    .el-table--border {
      border-radius: 5px;
    }
  }
}
</style>
