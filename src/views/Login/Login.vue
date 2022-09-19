<template>
  <div class="whole">
    <div class="login-box">
      <div class="form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          @keyup.enter.native="submitForm('ruleForm')"
        >
          <el-form-item label="身份" prop="user_identity">
            <el-select
              v-model="ruleForm.user_identity"
              placeholder="请选择身份"
            >
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="创作者" value="author"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="user_name">
            <el-input type="text" v-model="ruleForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="user_password">
            <el-input
              type="password"
              v-model="ruleForm.user_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btns">
          <span>还没有账户？<a @click="tosignup = true">去注册</a></span>
          <el-button @click="submitForm('ruleForm')" style="width: 85px"
            >登录</el-button
          >
        </div>
      </div>
      <!-- 注册弹框 -->
      <el-dialog title="注册" :visible.sync="tosignup">
        <el-form
          :model="signupForm"
          size="small"
          class="signup"
          :rules="rules_signup"
          ref="signupForm"
          status-icon
        >
          <el-form-item
            label="用户名"
            prop="user_name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="signupForm.user_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="user_password"
            :label-width="formLabelWidth"
          >
            <el-input
              type="password"
              v-model="signupForm.user_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
            :label-width="formLabelWidth"
          >
            <el-input
              type="password"
              v-model="signupForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" :label-width="formLabelWidth">
            <el-input
              v-model="signupForm.user_identity"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="tosignup = false">取 消</el-button>
          <el-button class="btn" @click="submitRegister('signupForm')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    /* 校验规则 */
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.signupForm.checkPass !== "")
          this.$refs.signupForm.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signupForm.user_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "100px",
      tosignup: false,
      ruleForm: {
        // user_id: "",
        user_name: "",
        user_password: "",
        user_identity: "",
      },
      signupForm: {
        user_name: "",
        user_password: "",
        checkPass: "",
        user_identity: "创作者",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        user_identity: [
          { required: true, message: "请选择身份", trigger: "change" },
        ],
        user_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "密码至少3位", trigger: "blur" },
        ],
      },
      rules_signup: {
        user_password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { user_name, user_password, user_identity } = this.ruleForm;
          //请求登录接口
          this.$api
            .getLogin({
              user_name,
              user_password,
              user_identity,
            })
            .then((res) => {
              if (res.data.status === 200) {
                // console.log(jwt(res.data.data));
                console.log(res.data.data);
                //登录成功后 1、存储登录信息 2、跳转网页 3、顶部区域显示用户信息 4、持久化
                let obj = {
                  user: jwt(res.data.data).user_name,
                  user_id: jwt(res.data.data).user_id,
                  user_identity: jwt(res.data.data).user_identity,
                  token: res.data.data,
                };
                this.setUser(obj);
                //存储本地
                localStorage.setItem("user", JSON.stringify(obj));
                //跳转
                let role = JSON.parse(
                  window.localStorage.getItem("user")
                ).user_identity;
                if (role === "admin") {
                  this.$router.push("/");
                } else if (role === "author") {
                  this.$router.push("/");
                }
              } else {
                this.$message({
                  showClose: true,
                  message: "账号或密码输入错误！",
                  type: "error",
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 注册提交 */
    submitRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { user_name, user_password } = this.signupForm;
          let user_identity = "author";
          console.log(user_name, user_password);
          this.$api
            .signup({ user_name, user_password, user_identity })
            .then((res) => {
              alert(res.data.msg);
            });
        } else {
          alert("不规范！");
        }
        // this.$router.push("/");
      });
      this.tosignup = false;
    },
  },
};
</script>

<style lang="less" scoped>
.whole {
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #0e5754 0%,
    #0e5754 50%,
    #f6f5f5 50%,
    #f6f5f5 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 420px;
    height: 250px;
    margin: 0 auto;
    background: white;
    background: linear-gradient(to left bottom, transparent 50%, #edecec 0)
        no-repeat 100% 0 / 4em 4em,
      linear-gradient(-135deg, transparent 2.8em, white 0);
    .form {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      form {
        width: 400px;
        margin-left: 20px;
        .el-form-item {
          margin-bottom: 15px;
          .el-input {
            width: 225px;
          }
        }
      }
      .btns {
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 30px;
        background: #edecec;
        height: 60px;
        border: 0.3px solid #d5d5d5;
        span {
          margin-right: 15px;
          color: #8c8c8c;
          a {
            color: #8c8c8c;
            text-decoration: underline;
            cursor: pointer;
          }
        }
        button {
          width: 80px !important;
          height: 35px;
          letter-spacing: 0.5em;
          float: right;
          color: white;
          border: none;
          font-weight: 400;
          font-size: 15px;
          background: #0e5754;
        }
      }
    }
    .btn {
      background: #0e5754;
      color: white;
    }
    .bottom {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
<style lang="less">
.el-dialog {
  .el-dialog__body {
    padding: 0 !important;
    margin: 0;
    .signup {
      margin: 0 40px 0 0;
    }
  }
}
</style>
