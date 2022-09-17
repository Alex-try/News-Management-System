<template>
  <div class="submission-chart">
    <div class="calendar">
      <div class="weeks">
        <div class="week">周二</div>
        <div class="week">周四</div>
        <div class="week">周六</div>
      </div>
      <div
        class="column"
        v-for="(columnData, columnIndex) in dateData"
        :key="columnIndex"
      >
        <div class="title">{{ columnData.title }}</div>
        <div
          class="date-wrapper"
          v-for="(dateData, dateIndex) in columnData.data"
          :key="dateIndex"
          :style="`background:${getColor(dateData.number)};`"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="`${dateData.date}：${dateData.number}次操作`"
            placement="top"
            :open-delay="300"
            ><div class="date"></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="legend">
        <div class="level-desc">少</div>
        <div class="level level-1"></div>
        <div class="level level-2"></div>
        <div class="level level-3"></div>
        <div class="level level-4"></div>
        <div class="level level-5"></div>
        <div class="level-desc">多</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "submission-chart",
  data() {
    return {
      dateData: [],
      submissionRecord: {},
    };
  },
  props: ["recordList"],
  mounted() {
    this.formatData();
    this.init();
  },
  methods: {
    init() {
      // 上一年信息
      let prevYear = moment().format("YYYY") - 1;
      29;
      let prevTodayFormatStr = prevYear + "-" + moment().format("MM-DD");
      let prevToday = moment(prevTodayFormatStr).format("YYYY-MM-DD");
      // 上年今日的是星期几
      let prevTodayWeekNum = moment(prevToday).weekday() || 7;
      // 初始日期（上年临近的星期一）
      let firstMondayDate =
        prevTodayWeekNum > 1
          ? moment(prevToday)
              .add(8 - prevTodayWeekNum, "days")
              .format("YYYY-MM-DD")
          : prevToday;
      // 初始日期至今日的天数，包括今日
      let days = moment().diff(moment(firstMondayDate), "days") + 1;
      // 每周天数
      let columns = 7;
      // 最大列数（周数）
      let lineNums = Math.ceil(days / columns);
      // 绘制图表的源数据
      let dateData = [];
      let monthCN = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ];
      for (let i = 0; i < lineNums; i++) {
        // 最近一星期不一定满的
        let weekColumn =
          i === lineNums - 1
            ? days % columns
              ? days % columns
              : columns
            : columns;
        // 开始计算 title（月份的图例）
        // 思路：第一列直接根据第一天的月份
        30;
        // 之后的列数根据上一周的最后一天减去第一天的月份，如果大 代表月份发生了改变，下一列的 title 显示最新的月份
        let theWeekStartMonth = moment(firstMondayDate)
          .add(i * 7, "days")
          .format("M");
        let theWeekEndMonth = moment(firstMondayDate)
          .add(i * 7 + weekColumn, "days")
          .format("M");
        let title = i === 0 ? monthCN[theWeekStartMonth - 1] : "";
        let ifSwitchMonth = false;
        if (theWeekEndMonth - theWeekStartMonth) {
          ifSwitchMonth = true;
        }
        if (i && dateData[i - 1].ifSwitchMonth) {
          title = monthCN[theWeekEndMonth - 1];
        }
        // 图表源数据格式：columns：列数，title：列标题，itchMonth：月份是否发生改变，data：每格数据
        dateData.push({
          columns: weekColumn,
          title: title,
          ifSwitchMonth: ifSwitchMonth,
          data: [],
        });
        for (let j = 0; j < dateData[i].columns; j++) {
          let date = moment(firstMondayDate)
            .add(i * 7 + j, "days")
            .format("YYYY-MM-DD");
          let number = 0;
          number = this.submissionRecord[date]
            ? this.submissionRecord[date]
            : 0;
          // number：提交次数，date：提交日期
          dateData[i].data.push({
            number: number,
            date: date,
          });
        }
      }
      this.dateData = dateData;
      //   console.log(this.dateData);
    },
    formatData() {
      let submissionRecord = {};
      if (this.recordList) {
        this.recordList.map((v) => {
          let role = JSON.parse(
            window.localStorage.getItem("user")
          ).user_identity;
          let date;
          if (role === "admin") {
            date = moment(v["audit_time"]).format("YYYY-MM-DD");
          }
          if (role === "author") {
            date = moment(v["application_time"]).format("YYYY-MM-DD");
          }
          submissionRecord[date] = submissionRecord[date]
            ? submissionRecord[date] + 1
            : 1;
        });
        // submissionRecord 最后的格式应为 {'2020-01-01':10, '2020-01-11}
        this.submissionRecord = submissionRecord;
        console.log(this.submissionRecord);
      }
    },
    getColor(number) {
      // level color
      // 左闭右开
      let color = "#EBEDF0";
      if (number >= 12) {
        color = "#196127";
      } else if (number >= 8) {
        color = "#239A3B";
      } else if (number >= 4) {
        color = "#7BC96F";
      } else if (number >= 1) {
        color = "#C6E48B";
      } else {
        color = "#EBEDF0";
      }
      return color;
    },
  },
};
</script>
<style lang="less" scoped>
.submission-chart {
  width: 820px;
  height: 180px;
  background-color: #fff;
  margin: auto;
  margin-top: 20px;
  padding: 0px 0;
  font-size: 12px;

  .calendar {
    margin-left: 16px;
    margin-right: 16px;
    display: flex;

    .weeks {
      width: 30px;
      margin-right: 3px;
      margin-top: 22px;

      .week {
        margin-top: 13px;
        width: 30px;
        height: 14px;
      }
    }

    .column {
      width: 12px;
      margin-right: 3px;

      .title {
        width: 14px;
        height: 14px;
        margin-bottom: 8px;
        text-align: left;
        overflow: visible;
        white-space: nowrap;
      }

      .date-wrapper {
        width: 11px;
        height: 11px;
        background: #ebedf0;
        margin-bottom: 3px;
        border-radius: 3px;
        margin-right: 3px;

        .date {
          width: 11px;
          height: 11px;
        }
      }
    }
  }
  .operation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    .legend {
      display: flex;
      justify-content: center;
      align-items: center;

      .level-desc {
        margin-right: 6px;
        margin-left: 3px;
      }

      .level {
        margin-right: 3px;
        width: 11px;
        height: 11px;
      }

      .level-1 {
        background: #ebedf0;
      }

      .level-2 {
        background: #c6e48b;
      }

      .level-3 {
        background: #7bc96f;
      }

      .level-4 {
        background: #239a3b;
      }

      .level-5 {
        background: #196127;
      }
    }
  }
}
</style>
