<template>
  <div class="register">
    <LoginHeader></LoginHeader>
    <div class="from">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请输入用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="请选择类型" prop="category">
          <el-select v-model="ruleForm.region" placeholder="请选择注册类型">
            <el-option label="学生" value="student"></el-option>
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="教学管理者" value="manager"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 底部按钮 -->
        <el-form-item>
          
          <el-button type="info" @click="submitForm('ruleForm')">注册</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          <!-- 跳转到登录界面 -->
          <router-link to="/login" tag="button" v-text="'登录'"></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang='scss'>
// @import 'element-ui/lib/theme-chalk/index.css';
.from {
  width: 500px;
  margin: 0 auto;
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

import LoginHeader from '../components/LoginHeader'

export default {
    components: { LoginHeader },
    data() {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: '',
          region: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' },
            { message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { message: '请选择注册类型', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 这里需要发请求
            let params = {
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
              category: this.ruleForm.region
            }
            console.log(params);

            // 查询教学管理者的数量，禁止反复注册教学管理员
            if(params.category === 'manager') {
              console.log('执行了')
               this.$http.post('/users/findManager', {category: 'manager'})
                .then(res => {
                  if(res.data.length >= 3) {
                    alert('系统已经存在三个教学管理者，您无权进行注册');
                    this.$refs[formName].resetFields();
                    return;
                  } else {
                    console.log(11);

                    this.$http.post('/users/register', params)
                    .then((res) => {
                      console.log(res)
                      if(res.data.status == 1000){
                        try {
                          setTimeout(() => this.$router.push({ path:'/login'}), 800)
                        }
                        catch(err) {
                          alert('注册成功，请手动跳转到登录界面')
                        }
                        
                      }
                    })

                  }
                })
                .catch(err => {
                  console.log(err);
                });

            } else {
              this.$http.post('/users/register', params)
              .then((res) => {
                console.log(res)
                if(res.data.status == 1000){
                  try {
                    setTimeout(() => this.$router.push({ path:'/login'}), 800)
                  }
                  catch(err) {
                    alert('注册成功，请手动跳转到登录界面')
                  }
                  
                }else{
                  alert(res.data.message)
                }
              }).catch((err)=>{
                  console.log(err)
              })
            }    
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
    
}
</script>