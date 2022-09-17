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
      <table>
        <th style="font-weight: 300px">个人信息</th>
        <tr>
          <td class="name">编号</td>
          <td>:</td>
          <td class="info">{{ userForm.user_id }}</td>
        </tr>
        <tr>
          <td class="name">用户名</td>
          <td>:</td>
          <td class="info">{{ userForm.user_name }}</td>
        </tr>
        <tr>
          <td class="name">密码</td>
          <td>:</td>
          <td class="info">{{ userForm.user_password }}</td>
          <td class="op">
            <el-link @click="dialogFormVisible = true">修改密码</el-link>
          </td>
        </tr>
        <tr>
          <td class="name">身份</td>
          <td>:</td>
          <td class="info">{{ userForm.user_identity }}</td>
        </tr>
      </table>
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
    var id = JSON.parse(window.localStorage.getItem("user")).user_id;
    var identity = JSON.parse(
      window.localStorage.getItem("user")
    ).user_identity;
    return {
      userForm: {
        user_id: id,
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
    display: flex;
    flex-direction: columns;
    padding: 40px; //上 右 下 左
    table {
      th {
        float: left;
        font-size: 18px;
        letter-spacing: 0.3em;
        height: 40px;
      }
      tr {
        height: 30px;
        .name {
          text-align: center;
        }
        .info {
          padding-left: 20px;
          width: 100px;
        }
        .op {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
