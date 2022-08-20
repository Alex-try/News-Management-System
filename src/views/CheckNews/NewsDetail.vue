<template>
  <div class="newsdetail">
    <div class="newsform">
      <h1>新闻审核结果</h1>
      <div class="audit-result">
        <table>
          <tr>
            <td>
              <div>审核结果：{{ newsform.audit_result }}</div>
            </td>
            <td>
              <div>审核意见：{{ newsform.audit_info }}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>审核人：{{ newsform.admin_name }}</div>
            </td>
            <td>
              <div>审核时间：{{ newsform.audit_time }}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>提交人：{{ newsform.author_name }}</div>
            </td>
            <td>
              <div>提交时间：{{ newsform.application_time }}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="details">
        <div>新闻标题：{{ newsform.application_title }}</div>
        <div>
          <tr>
            <td id="news-content">新闻内容：</td>
            <p v-html="newsform.application_content"></p>
          </tr>
        </div>
        <div>所属专题：{{ newsform.topic_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsform: [],
    };
  },
  methods: {
    http() {
      this.newsform.application_title = this.$route.query.application_title;
      this.newsform.application_time = this.$route.query.application_time;
      this.newsform.audit_time = this.$route.query.audit_time;
      this.newsform.author_name = this.$route.query.author_name;
      this.newsform.admin_name = this.$route.query.admin_name;
      this.newsform.application_content = this.$route.query.application_content;
      this.newsform.audit_result = this.$route.query.audit_result;
      this.newsform.audit_info = this.$route.query.audit_info;
      this.newsform.topic_name = this.$route.query.topic_name;
      // let newsContent = this.newsform.application_content;
    },
  },
  created() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.newsdetail {
  width: 80%;
  margin: 0 auto;
  .newsform {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 10px 10px #465c8b;
    h1 {
      padding-top: 20px;
      text-align: center;
    }
    .audit-result {
      width: 100%;
      margin: 10px 0;
      font-family: "微软雅黑", "Arial Narrow", sans-serif;
      font-size: 18px;
      table {
        margin: 0 auto;
        width: 60%;
        border: 2px solid #93c178;
        border-radius: 5px;
        padding: 10px;
        tr {
          height: 30px;
          td {
            width: 300px;
          }
        }
      }
    }
    .details {
      width: 80%;
      margin: 0 auto;
      font-size: 15px;
      div {
        margin: 5px;
        padding: 5px;
      }
      #news-content {
        width: 76px;
      }
      p {
        text-indent: 2em;
      }
    }
  }
}
</style>
