<template>
  <div class="login-box">
    <h2>登录</h2>
    <div class="form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="身份" prop="user_identity">
          <el-select v-model="ruleForm.user_identity" placeholder="请选择身份">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="创作者" value="author"></el-option>
            <el-option label="普通用户" value="visitor"></el-option>
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
        <el-form-item style="margin-left:20px;">
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:85px;"
            >登录</el-button
          >
          <el-button  style="margin-left:30px;width:85px;" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        user_name: "",
        user_password: "",
        user_identity: "",
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
        ],
        user_identity: [{required:true, message: "请选择身份", trigger: "change" }],
        user_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "密码至少3位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          let { user_name, user_password, user_identity } = this.ruleForm;
          // console.log(user_name,user_password,user_identity)
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
                  user_identity:jwt(res.data.data).user_identity,
                  token: res.data.data,
                };
                this.setUser(obj);
                //存储本地
                localStorage.setItem("user", JSON.stringify(obj));
                //跳转
                this.$router.push("/");
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /* validPassword(rule,value,callback){
      let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
      if(!reg.test(value)){callback(new Error('密码必须是由8-20位字母+数字组合'))
      }else{
          callback()
      }
    } */
  },
};
</script>

<style lang="less" scoped>
.login-box {
  width: 500px;
  height: 360px;
  margin: 180px auto;
  background-color: #fff;
  border-radius: 10px;
  h2 {
    text-align: center;
    padding: 20px;
  }
  .form {
    display: flex;
    // justify-content: center;
    form {
      width: 400px;
      margin-left: 40px;
    }
  }
}
</style>