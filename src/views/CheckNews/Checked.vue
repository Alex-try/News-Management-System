<template>
  <div class="checked">
    <!-- 专题下拉菜单 -->
    <div class="topic_menus">
      <el-dropdown @command="showItems">
        <el-button type="primary">
          专题类别<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">全部</el-dropdown-item>
          <el-dropdown-item
            v-for="(item, index) in topics"
            :key="index"
            :command="item.topic_id"
            >{{ item.topic_name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="wrapper">
      <el-table :data="tableData" stripe>
        <el-table-column prop="application_title" label="新闻标题" width="350">
        </el-table-column>
        <el-table-column prop="author_name" label="作者" width="110">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      tableData: [],
      audit_table: [],
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
    /* 获取菜单的专题信息 */
    http() {
      this.$api.getTopics({ id: "%" }).then((res) => {
        // console.log(res.data.result);
        this.topics = res.data.result;
        /* res.data.result.forEach((item, index) => {
          this.topics[index] = item.topic_name;
        }); */
        // console.log(this.topics);
      });
    },
    /* 展示已审核 */
    showItems(command) {
      this.tableData = [];
      let temp = [];
      let AuthorId = [];
      let AdminId = [];
      /* 获取作者姓名 */
      /* let AuthorNames = [];
      AuthorNames[AuthorNames.length] = new Object();
      this.$api.getAuthorName({ name: "author_name", command }).then((res) => {
        console.log(res.data.result);
        AuthorNames = res.data.result;
      });
      /* 获取审核人姓名 */
      /* let AuditNames = [];
      AuditNames[AuditNames.length] = new Object();
      this.$api.getAuthorName({ name: "admin_name", command }).then((res) => {
        // console.log(res.data.result);
        AuditNames = res.data.result;
        // console.log(AuditNames);
      });  */
      /* 获取审核表信息 */
      this.$api.getAudit({ command }).then((res) => {
        // console.log(res.data.result);
        for (let i = 0; i < res.data.result.length; i++) {
          temp[i] = new Object();
          AuthorId[i] = res.data.result[i].author_id;
          AdminId[i] = res.data.result[i].admin_id;
          /* 获取作者姓名 */
          this.$api
            .getAuthorName({ name: "author_name", id: AuthorId[i] })
            .then((res) => {
              // console.log(res.data.result);
              temp[i].author_name = res.data.result[0].author_name;
              // console.log(AuditNames);
            });
          /* 获取审核人姓名 */
          this.$api
            .getAuthorName({ name: "admin_name", id: AdminId[i] })
            .then((res) => {
              // console.log(res.data.result);
              temp[i].admin_name = res.data.result[0].admin_name;
              // console.log(AuditNames);
            });
          /* 获取专题名 */
          let topic_id = res.data.result[i].topic_id;
          this.$api.getTopics({ id: topic_id }).then((res) => {
            console.log(res.data.result);
            temp[i].topic_name = res.data.result[0].topic_name;
          });
          temp[i].application_title = res.data.result[i].application_title;
          temp[i].application_time = this.formatTime(
            res.data.result[i].application_time
          );
          temp[i].audit_time = this.formatTime(res.data.result[i].audit_time);
          temp[i].application_content = res.data.result[i].application_content;
          temp[i].audit_result = res.data.result[i].audit_result;
          temp[i].audit_info = res.data.result[i].audit_info;
        }
        this.tableData = temp;
        // console.log(this.tableData);
      });
    },
    jump(row) {
      console.log(row);
      /* 传递的参数用{{ $route.query.goodsId }}获取 */
      const { href } = this.$router.resolve({
        path: `/newsdetail`,
        query: {
          application_title: row.application_title,
          application_time: row.application_time,
          audit_time: row.audit_time,
          author_name: row.author_name,
          admin_name: row.admin_name,
          application_content: row.application_content,
          audit_result: row.audit_result,
          audit_info: row.audit_info,
          topic_name: row.topic_name,
        },
      });
      window.open(href, "_blank");
    },
  },
  created() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.checked {
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
