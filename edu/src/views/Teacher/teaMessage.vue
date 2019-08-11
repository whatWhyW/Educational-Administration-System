<template>
  <div class="index">
    <!-- <div style="height: 60px">
      <span class='font'>欢迎进入本校教师信息管理模块</span>
      <p class='text'>教师是核心，是学校培养学生的人才，管理教师信息，了解教师需求很关键</p>
    </div> -->
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
        prop="teaNum"
        label="教师工号">
      </el-table-column>
      <el-table-column
        prop="teacherName"
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
        prop="speciality"
        label="专长">
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
        <el-form-item label="教师工号" prop="teaNum" autocomplete="off" disabled='false'>
          <el-input v-model="form.teaNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="teaMessage">
          <el-input autocomplete="off" v-model="form.teacherName" placeholder='禁止修改姓名'></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select style='width: 100%; position: absolute; left: 138px' v-model="form.sex" placeholder="请选择性别">
              <el-option style='height: 80%' label="男" value="男" autocomplete="off"></el-option>
              <el-option style='height: 80%' label="女" value="女" autocomplete="off"></el-option>
              <el-option style='height: 80%' label="保密" value="保密" autocomplete="off"></el-option>
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
        <el-form-item label="专长">
          <el-input v-model="form.speciality" autocomplete="off"></el-input>
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
  .el-dialog__body {
    padding: 10px 20px;
  }
  .el-input {
    width: 80%
  }
  .el-form-item__label {
    width: 15%
  }
  .el-table-column {
    width: 100%;
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
        teaNum: '',
        teacherName: "",
        sex: "",
        age: null,
        moblie: null,
        className: '',
        speciality: '',
      },
      rules: {
        age: [
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        ],
        moblie: [
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {

    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
    
        if(url === '/teacher/editTeacher') {
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
            opt.teacherName = opt.teacherName
            console.log(opt.teacherName)
            // 修改
              that.sendRequest('/teacher/editTeacher',opt)
            }
          that.dialogFormVisible = false
          // that.getAllData()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editData(index) {
      // console.log(this.tableData.teacherName)
      const selfData = this.tableData[index]
      this.editId = selfData._id
      this.dialogFormVisible = true
      this.isEdit = true
      this.form.teaNum = selfData.teaNum
      this.form.teacherName = this.form.teacherName
      this.form.sex = selfData.sex
      this.form.age = selfData.age
      this.form.moblie = selfData.moblie
      this.form.className = selfData.className
      this.form.speciality = selfData.speciality
    },


    // 请求所有数据
    getAllData() {
      var _this = this
      console.log(JSON.parse(window.localStorage.teaInfo).username)
      this.$http.post('/teacher/findMsg', {teacherName: JSON.parse(window.localStorage.teaInfo).username}).then(function (res) {
        
        if(res.data.length === 0) {
            alert('该系统还没有您的个人信息，请联系教学管理员');
            return;
        }
        _this.tableData.push(res.data)
        // _this.tableData = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
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

