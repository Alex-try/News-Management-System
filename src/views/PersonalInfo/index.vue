<template>
  <div class="personalInfo">
    <!-- 面包屑，导航 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/personalinfo' }"
          >个人信息</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 主体内容 -->
    <div class="content">
      <h3>编号：{{ userForm.user_id }}</h3>
      <h3>姓名：{{ userForm.user_name }}</h3>
      <h3>身份：{{ userForm.user_identity }}</h3>
      <h3>密码：{{ userForm.user_password }}</h3>
      <el-button
        type="primary"
        plain
        @click="dialogFormVisible = true"
        class="changePsw"
        >修改密码</el-button
      >

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="100px"
        >
          <el-form-item
            label="输入密码"
            prop="pass"
            :label-width="formLabelWidth"
          >
            <el-input
              type="password"
              v-model="form.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="再次输入"
            prop="checkPass"
            :label-width="formLabelWidth"
          >
            <el-input
              type="password"
              v-model="form.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var name = JSON.parse(window.localStorage.getItem("user")).user;
    var identity = JSON.parse(
      window.localStorage.getItem("user")
    ).user_identity;
    return {
      userForm: {
        user_id: "",
        user_name: name,
        user_identity: identity,
        user_password: "",
      },
      form: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
    };
  },
  methods: {
    http() {
      let user_name = this.userForm.user_name;
      let user_identity = this.userForm.user_identity;
      this.$api
        .getId({
          user_name,
          user_identity,
        })
        .then((res) => {
          console.log(res.data.result[0]);
          this.userForm.user_id = res.data.result[0].user_id;
          this.userForm.user_password = res.data.result[0].user_password;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user_id = this.userForm.user_id;
          let user_password = this.form.pass;
          // console.log(user_password);
          this.$api
            .changePsw({
              user_id,
              user_password,
            })
            .then((res) => {
              console.log(res.data.result);
              this.dialogFormVisible = false;
            });
          alert("修改成功!");
          this.reload();
        } else {
          console.log("修改失败!!");
          return false;
        }
      });
    },
  },
  created() {
    this.http();
  },
};
</script>

<style lang="less" scoped>
.personalInfo {
  margin: 10px;
  .title {
    margin: 25px;
    padding: 10px;
  }
  .content {
    margin: 25px;
    text-align: center;
    background-color: rgb(236, 233, 233);
    border-radius: 8px;
    padding: 50px 30px 20px 0; //上 右 下 左
    h3 {
      margin: 10px;
    }
    .changePsw {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
  }
}
</style>
