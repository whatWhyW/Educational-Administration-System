<template>
  <div class="index">   
    
    <el-row style="margin: 0 auto;">
      <p class="font">以下是您的个人信息</p>
      <div class="searchbox" style="display: inline-block; float: right;">
      </div>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
   		<el-table-column
        prop="stuNum"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="moblie"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级">
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editData(scope.$index)">修改</el-button>
         </template>
      </el-table-column>

    </el-table>


    <el-dialog title="填写你的信息" :visible.sync="dialogFormVisible" style="height: 100%">
      <el-form :model="form" :rules="rules" ref="form">
      	<el-form-item label="学号" prop="stuNum" autocomplete="off">
          <el-input v-model="form.stuNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="性别" prop="sex">
            <el-select style='width: 100%; position: absolute; left: 138px' v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男" autocomplete="off"></el-option>
              <el-option label="女" value="女" autocomplete="off"></el-option>
              <el-option label="保密" value="保密" autocomplete="off"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.moblie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFrom">确 定</el-button>
      </div>
    </el-dialog>

    
  </div>
</template>

<style lang='scss'>
  @import "../../static/css/base.scss";
  .font {
    @include fontTwo()
  }
  .text {
    @include fontThree()
  }
  .el-input {
    width: 80%
  }
  .el-form-item__label {
    width: 15%
  }
</style>

<script>
export default {
  name: "index",
  data() {
    return {
      dialogVisible:false,
      tableData: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
      	stuNum: '',
        name: "",
        sex: "",
        age: null,
        moblie: null,
        className: '',
        // address: '',
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { type: 'number', message: '年龄必须为数字值'}
        ],
        moblie: [
          { type: 'number', message: '年龄必须为数字值'}
        ]
      }
    }
  },

  methods: {
    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
        if(url === '/student/editStudent') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } 
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    submitFrom() {
      const that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(that.isEdit) {
            let opt = that.form
            opt._id = that.editId
            // 修改
              that.sendRequest('/student/editStudent',opt)
            }      
          that.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      
    },

    // 请求所有数据
    getAllData() {
      console.log(this.form.className.age)
      var _this = this
      // console.log(JSON.parse(window.localStorage.stuInfo).username)
      this.$http.post('/student/findMsg', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function (res) {
        if(res.data.length === 0) {
            alert('该系统还没有您的个人信息，请联系教学管理员');
            return;
        }
        _this.tableData.push(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    
    editData(index) {
      const selfData = this.tableData[index]
      this.editId = selfData._id
      this.dialogFormVisible = true
      this.isEdit = true
      this.form.stuNum = selfData.stuNum
      this.form.name = selfData.name
      this.form.sex = selfData.sex
      this.form.age = selfData.age
      this.form.moblie = selfData.moblie
      this.form.className = selfData.className
    },
  },

  watch: {
    dialogFormVisible() {
      if(!this.dialogFormVisible) this.isEdit=false
    }
  },
  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    this.getAllData();
  }

  
};
</script>

