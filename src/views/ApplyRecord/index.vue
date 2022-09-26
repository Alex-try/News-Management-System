<template>
  <div class="records">
    <!-- 下拉菜单 -->
    <div class="record_menu">
      <el-dropdown @command="showItems">
        <el-button type="primary">
          审核情况<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">已通过</el-dropdown-item>
          <el-dropdown-item command="1">被驳回</el-dropdown-item>
          <el-dropdown-item command="2">待处理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="wrapper" v-show="this.flag">
      <el-table :data="tableData" stripe>
        <el-table-column prop="application_title" label="新闻标题" width="350">
        </el-table-column>
        <el-table-column prop="topic_name" label="所属专题" width="110">
        </el-table-column>
        <el-table-column prop="application_time" label="申请时间" width="190">
        </el-table-column>
        <el-table-column prop="admin_name" label="审核人" width="110">
        </el-table-column>
        <el-table-column prop="audit_time" label="审核时间" width="190">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="jump(scope.row)" class="init" size="mini">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wrapper" v-show="!this.flag">
      <el-table :data="tableData1" stripe>
        <el-table-column prop="application_title" label="新闻标题" width="500">
        </el-table-column>
        <el-table-column prop="topic_name" label="所属专题" width="110">
        </el-table-column>
        <el-table-column prop="application_time" label="申请时间" width="190">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="jump(scope.row)" class="init" size="mini">
              查看
            </el-button>
            <el-button type="danger" @click="del(scope.$index)" size="mini">
              撤回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var author_id = JSON.parse(window.localStorage.getItem("user")).user_id;
    return {
      tableData: [],
      tableData1: [],
      flag: true,
      author_id: author_id,
    };
  },
  methods: {
    /* 规范时间格式 */
    formatTime(time) {
      let d = new Date(time);
      let times =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return times;
    },
    showItems(command) {
      let r = ["通过", "驳回", "待处理"];
      var temp = [];
      this.$api
        .getApplyRecord({
          audit_result: r[command],
          author_id: this.author_id,
        })
        .then((res) => {
          for (let i = 0; i < res.data.result.length; i++) {
            temp[i] = new Object();
            temp[i].application_id = res.data.result[i].application_id;
            temp[i].application_title = res.data.result[i].application_title;
            temp[i].application_content =
              res.data.result[i].application_content;
            temp[i].application_time = this.formatTime(
              res.data.result[i].application_time
            );
            temp[i].topic_id = res.data.result[i].topic_id;
            temp[i].topic_name = res.data.result[i].topic_name;
            temp[i].audit_time = "暂无";
            temp[i].admin_name = "暂无";
            temp[i].audit_result = "暂无";
            temp[i].audit_info = "暂无";
            if (command === "0" || command === "1") {
              temp[i].audit_time = this.formatTime(
                res.data.result[i].audit_time
              );
              temp[i].audit_result = r[command];
              temp[i].audit_info = res.data.result[i].audit_info;
              temp[i].admin_name = res.data.result[i].admin_name;
              // console.log(res.data.result[i]);
            }
          }
          // console.log(temp);
          if (command === "2") {
            this.flag = false;
            this.tableData1 = temp;
          } else {
            this.flag = true;
            this.tableData = temp;
          }
        });
    },
    jump(row) {
      console.log(row);
      const { href } = this.$router.resolve({
        path: `/newsdetail`,
        query: {
          application_title: row.application_title,
          application_time: row.application_time,
          audit_time: row.audit_time,
          author_name: JSON.parse(window.localStorage.getItem("user")).user,
          admin_name: row.admin_name,
          application_content: row.application_content,
          audit_result: row.audit_result,
          audit_info: row.audit_info,
          topic_name: row.topic_name,
        },
      });
      window.open(href, "_blank");
    },
    del(index) {
      this.$confirm("此操作将撤回该申请并存入草稿箱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "撤回成功!",
          });

          /* 添加到草稿箱 */
          this.$api
            .addDraft({
              draft_title: this.tableData1[index].application_title,
              topic_id: this.tableData1[index].topic_id,
              author_id: this.author_id,
              draft_content: this.tableData1[index].application_content,
            })
            .then((res) => {
              console.log(res.data);
            });
          /* 从申请表中删除 */
          this.$api
            .delApply({
              application_id: this.tableData1[index].application_id,
            })
            .then((res) => {
              console.log(res.data);
            });
          this.tableData1.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤回",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.records {
  margin: 20px;
  .wrapper {
    margin: 20px 0;
    .el-table .el-table__cell {
      text-align: center;
    }
    .init {
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
}
</style>
