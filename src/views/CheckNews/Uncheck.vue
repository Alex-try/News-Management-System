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
        <el-table-column prop="application_title" label="新闻标题" width="400">
        </el-table-column>
        <el-table-column prop="author_name" label="作者" width="120">
        </el-table-column>
        <el-table-column prop="application_time" label="申请时间" width="200">
        </el-table-column>
        <el-table-column prop="topic_name" label="所属专题" width="100">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="jump(scope.row)" class="init" size="mini">
              审核
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
      });
      this.showItems("a");
    },
    /* 展示未审核 */
    showItems(command) {
      this.tableData = [];
      let temp = [];
      let role_id = JSON.parse(window.localStorage.getItem("user")).user_id;
      this.$api.getUnAudit({ command, role_id }).then((res) => {
        for (let i = 0; i < res.data.result.length; i++) {
          temp[i] = new Object();
          temp[i].author_name = res.data.result[i].author_name;
          temp[i].topic_name = res.data.result[i].topic_name;
          temp[i].application_id = res.data.result[i].application_id;
          temp[i].application_title = res.data.result[i].application_title;
          temp[i].application_time = this.formatTime(
            res.data.result[i].application_time
          );
          temp[i].application_content = res.data.result[i].application_content;
        }
        this.tableData = temp;
        // console.log(this.tableData);
      });
    },
    jump(row) {
      console.log(row);
      /* 传递的参数用{{ $route.query.goodsId }}获取 */
      const { href } = this.$router.resolve({
        path: `/toaudit`,
        query: {
          application_id: row.application_id,
          application_title: row.application_title,
          application_time: row.application_time,
          author_name: row.author_name,
          application_content: row.application_content,
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
