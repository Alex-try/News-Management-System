<template>
  <div class="toaudit">
    <div class="auditform">
      <h1>审核申请</h1>
      <div class="details">
        <div>新闻标题：{{ auditForm.application_title }}</div>
        <div>新闻内容：</div>
        <div class="news-content">
          <p v-html="auditForm.application_content"></p>
        </div>
        <div>所属专题：{{ auditForm.topic_name }}</div>
      </div>
      <el-form
        class="audit-result"
        :model="auditForm"
        :rules="rules"
        ref="auditForm"
        label-width="100px"
      >
        <el-form-item label="审核意见" prop="audit_info">
          <el-input type="textarea" v-model="auditForm.audit_info"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input
            v-model="auditForm.admin_name"
            placeholder="审核人"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="auditForm.audit_result" placeholder="审核结果">
            <el-option label="通过" value="通过"></el-option>
            <el-option label="驳回" value="驳回"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('auditForm')" class="btn"
            >提交</el-button
          >
          <el-button @click="resetForm('auditForm')" class="btn"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let id = JSON.parse(window.localStorage.getItem("user")).user_id;
    let name = JSON.parse(window.localStorage.getItem("user")).user;
    return {
      auditForm: {
        audit_info: "",
        admin_name: name,
        audit_result: "",
        admin_id: id,
        audit_time: new Date(),
      },
      rules: {
        admin_name: [{ required: true, trigger: "blur" }],
        audit_result: [{ required: true, trigger: "blur" }],
      },
    };
  },
  methods: {
    http() {
      this.auditForm.application_id = this.$route.query.application_id;
      this.auditForm.application_title = this.$route.query.application_title;
      this.auditForm.application_time = this.$route.query.application_time;
      this.auditForm.author_name = this.$route.query.author_name;
      this.auditForm.application_content =
        this.$route.query.application_content;
      this.auditForm.topic_name = this.$route.query.topic_name;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.auditForm);
          let {
            application_id,
            admin_id,
            audit_result,
            audit_time,
            audit_info,
          } = this.auditForm;
          this.$api
            .addAudit({
              application_id,
              admin_id,
              audit_result,
              audit_time,
              audit_info,
            })
            .then((res) => {
              console.log(res.data);
            });
          alert("提交成功!");
        } else {
          alert("提交失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.toaudit {
  width: 80%;
  margin: 0 auto;
  .auditform {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    border-radius: 5px;
    border: #465c8b 1px solid;
    box-shadow: 10px 10px #465c8b;
    h1 {
      padding-top: 20px;
      text-align: center;
    }
    .details {
      width: 80%;
      margin: 0 auto;
      font-size: 15px;
      div {
        margin: 5px;
        padding: 5px;
        p {
          text-indent: 2em;
        }
      }
      .news-content {
        border: #7a808d 1px dotted;
        border-radius: 4px;
      }
    }
    .audit-result {
      width: 60%;
      margin: 40px auto;
      font-size: 15px;
      padding: 10px;
    }
    .btns {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .btn:nth-child(1) {
        color: #4a653a;
        background: #f7ef6a;
        border-color: #d6ce45;
      }
      .btn:nth-child(2) {
        color: #4a653a;
        border-color: #d6ce45;
      }
    }
  }
}
</style>
