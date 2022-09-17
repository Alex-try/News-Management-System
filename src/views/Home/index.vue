<template>
  <div class="records">
    <div class="title">
      <span>欢迎来到新闻管理平台</span>
    </div>
    <submission-chart
      class="contain"
      :recordList="recordList"
      v-if="flag"
    ></submission-chart>
  </div>
</template>

<script>
import SubmissionChart from "../../components/SubmissionChart.vue";
export default {
  components: { SubmissionChart },
  data() {
    return {
      flag: false,
      recordList: [],
    };
  },
  methods: {
    http() {
      this.$api
        .getRecords({
          role_id: JSON.parse(window.localStorage.getItem("user")).user_id,
          role: JSON.parse(window.localStorage.getItem("user")).user_identity,
        })
        .then((res) => {
          this.recordList = res.data.data;
          this.flag = true;
          console.log(this.flag);
        });
    },
  },

  created() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.records {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 30px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    letter-spacing: 0.2em;
    margin: 80px;
    color: #2e333e;
  }
}
</style>
