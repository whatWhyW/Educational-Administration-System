<template>
  <div class="register">
    <LoginHeader></LoginHeader>
    <div class="from">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="请选择类型" prop="category">
          <el-select v-model="ruleForm.region" placeholder="请选择注册类型">
            <el-option label="学生" value="xuesheng"></el-option>
            <el-option label="教师" value="jiaoshi"></el-option>
            <el-option label="教学管理者" value="manager"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="请输入密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          <!-- 跳转到注册界面 -->
          <router-link to="/register" tag="button" v-text="'去注册'"></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang='scss'>
// @import 'element-ui/lib/theme-chalk/index.css';
.from {
  margin: 0px auto;
  width: 500px;
  .el-select, .el-form-item {
    width: 100%;
    .el-input {
      width: 400px;
    }
  }
  button {
    width: 70px;
    height: 40px;
    margin-right: 20px;
    background-color: #3C8EC0;
    box-shadow: none;
    border: 1px solid #3c60c9;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
  }

}
</style>

<script>
import LoginHeader from '../components/LoginHeader';

export default {
    components: { LoginHeader },
    data() {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      };
      return {
        ruleForm: {
          pass: '',
          name: '',
          category: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' },
            { message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let params = {
                username: this.ruleForm.name,
                password: this.ruleForm.pass,
              }
              // console.log(params);
              this.$http.post('/users/login', params)
                .then((res) => {
                  var _this = this
                  console.log(res)
                  // console.log(res.data.data[0]);
                  if(res.data.status == 1001) {
                    alert('用户不存在或密码错误，您无法登陆！')
                    _this.resetForm('ruleForm')
                    return
                  }
                  
                  else if (res.data.status == 1000) {
                      alert('登录成功');
                      try {
                        switch(res.data.data[0].category) {
                          case "student":
                            localStorage.setItem("stuInfo", JSON.stringify(res.data.data[0]));
                            setTimeout(() => this.$router.push({ path:'/student/start'}), 800)
                            break;
                          case "teacher":
                            localStorage.setItem("teaInfo", JSON.stringify(res.data.data[0]));
                            setTimeout(() => this.$router.push({ path:'/teacher/start'}), 800)
                            break;
                          case "manager":
                            localStorage.setItem("manInfo", JSON.stringify(res.data.data[0]));
                            setTimeout(() => this.$router.push({ path:'/manager/start'}), 800)
                            break;
                        }
                      }
                      catch(err) {
                          alert('对不起，登录失败，请重新尝试');
                      }
                  }else{ 
                      alert('用户名不存在或密码错误，您无法登陆！')
                  }
              }).catch((err)=>{
                  console.log(err)
              })
            } else {
            console.log('error submit!!')
            return false
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields()
    }
  }
}
</script>