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
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="id">
          <el-select v-model="ruleForm.region" placeholder="请选择身份">
            <el-option label="管理者" value="admin"></el-option>
            <el-option label="创作者" value="author"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          id: '',
          admin: '',
          author: '',
          user: '',
          psw:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],
          psw:[
            {required:true, message:'请输入密码', trigger:'blur'},
            {min:8, message:'至少8位，并且包含数字和字母', trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="less" scoped>
.adduser {
  margin: 10px;
}
.title {
  padding: 10px;
}
.content{
    margin: 25px;
}
</style>