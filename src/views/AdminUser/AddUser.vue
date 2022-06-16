<template>
  <div class="adduser">
    <!-- 面包屑，导航 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminuser' }"
          >用户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 主体内容 -->
    <div class="content">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="userForm"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="userForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="user_identity">
          <el-select v-model="userForm.user_identity" placeholder="请选择身份">
            <el-option label="管理者" value="admin"></el-option>
            <el-option label="创作者" value="author"></el-option>
            <el-option label="普通用户" value="visitor"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input v-model="userForm.user_password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')" class="btn"
            >立即添加</el-button
          >
          <el-button @click="resetForm('userForm')" class="btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        user_name: "",
        user_identity: "",
        user_password: "",
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { user_name, user_password, user_identity } = this.userForm;
          this.$api.addUser({
            user_name,user_password,user_identity
          })
          .then((res)=>{
            console.log(res.data)
          })
          alert("添加成功!");
        } else {
          console.log("添加不符合规范!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.adduser {
  margin: 10px;
}
.title {
  margin: 25px;
  padding: 10px;
  background-color: #dee3e1;
}
.content {
  margin: 25px;
  background-color: #dee3e1;
  padding: 50px 30px 20px 0; //上 右 下 左
}
button {
  color: #4a653a;
  background: #f7ef6a;
  border-color: #d6ce45;
}
</style>