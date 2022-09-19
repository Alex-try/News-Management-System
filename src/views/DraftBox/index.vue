<template>
  <div class="wrapper">
    <el-table
      :data="tableData"
      stripe
      max-height="450"
      @filter-change="filterChange"
    >
      <el-table-column prop="draft_title" label="标题" width="500">
      </el-table-column>
      <el-table-column
        prop="topic_name"
        label="所属专题"
        width="120"
        column-key="topic_name"
        :filters="topics"
        :filter-multiple="false"
        filter-placement="bottom-end"
      >
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope"
          ><el-button @click="jump(scope.row)" class="init" size="mini">
            编辑
          </el-button>
          <el-button type="danger" @click="del(scope.$index)" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    var id = JSON.parse(window.localStorage.getItem("user")).user_id;
    return {
      tableData: [],
      allList: [],
      author_id: id,
      topics: [],
      total: 1,
    };
  },
  methods: {
    http() {
      this.$api.showDraft({ author_id: this.author_id }).then((res) => {
        this.tableData = res.data.data;
        this.allList = res.data.data;
        let arr = res.data.data;
        let topics = arr.reduce((acc, item) => {
          acc.push({
            text: item.topic_name,
            value: item.topic_name,
          });
          return acc;
        }, []);
        const r = new Map();
        this.topics = topics.filter(
          (item) => !r.has(item["text"]) && r.set(item["text"], 1)
        );
      });
    },
    jump(row) {
      // console.log(row);
      this.$router.push({
        path: `/editdraft`,
        query: {
          application_title: row.draft_title,
          author_id: row.author_id,
          application_content: row.draft_content,
          topic_name: row.topic_name,
          topic_id: row.topic_id,
          draft_id: row.draft_id,
        },
      });
    },
    del(index) {
      this.$confirm("此操作将删除该草稿, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "撤回成功!",
          });
          this.$api
            .delDraft({
              draft_id: this.tableData[index].draft_id,
            })
            .then((res) => {
              console.log(res.data);
            });
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤回",
          });
        });
    },
    /* 筛选 */
    filterChange(value) {
      this.tableData = this.allList;
      const filtersKey = value.topic_name;
      if (filtersKey.length > 0) {
        let arr = [];
        arr = this.allList.filter((data) => {
          // console.log(data["topic_name"]);
          return data["topic_name"] === filtersKey[0];
        });
        this.total = arr.length;
        // console.log(arr, this.total);
        this.tableData = arr;
        return arr;
      }
      return this.tableData;
    },
  },
  created() {
    this.http();
  },
  mounted() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  margin: 20px 50px;
  .init {
    color: #4a653a;
    background: #f7ef6a;
    border-color: #d6ce45;
  }
}
</style>
