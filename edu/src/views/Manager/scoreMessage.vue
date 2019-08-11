<template>
  <div class="index">
    <!-- <div style="height: 60px">
      <span class='font'>欢迎进入本校教师信息管理模块</span>
      <p class='text'>教师是核心，是学校培养学生的人才，管理教师信息，了解教师需求很关键</p>
    </div> -->
    <el-row style="margin: 0 auto;">
      <el-button type="primary" @click="dialogFormVisible = true" style=''>新增</el-button>
      <div class="searchbox" style="display: inline-block; float: right;">
        <input class="sc" type="text" placeholder="请输入教工号||教师姓名||性别||班级||专长" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
        <el-button type="warning" plain @click="searchData">搜索</el-button>
        <el-button type="danger" plain @click="getAllData()">刷新</el-button>
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
          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
         </template>
      </el-table-column>

    </el-table>

    

    <el-dialog title="填写你的信息" :visible.sync="dialogFormVisible" style="height: 100%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="教师工号" prop="teaNum" autocomplete="off">
          <el-input v-model="form.teaNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="form.teacherName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select style='width: 100%; position: absolute; left: 138px' v-model="form.sex" placeholder="请选择性别">
              <el-option style='height: 80%' label="男" value="男" autocomplete="off"></el-option>
              <el-option style='height: 80%' label="女" value="女" autocomplete="off"></el-option>
              <el-option style='height: 80%' label="保密" value="保密" autocomplete="off"></el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item> -->
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定要删除信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delData">确 定</el-button>
      </span>
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
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        age: [
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        ],
        moblie: [
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur'       }
        ]
      }
    }
  },

  methods: {
    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
        // console.log(res)
         // 将数据存储起来
        if(url === '/teacher/addScore') {
          // console.log("添加用户信息")
          // console.log(res)
          _this.tableData.push(res.data)
        } else if(url === '/teacher/editScore') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } else if(url === '/teacher/delScore') {
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
              that.sendRequest('/teacher/editScore',opt)
            }else {
              // 新增
              that.sendRequest('/teacher/addScore',that.form)
            }
          
          that.dialogFormVisible = false
          // that.getAllData()
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      
    },

    // 请求所有数据
    getAllData() {
      var _this = this
      this.$http.get('/teacher/scoreAll').then(function (res) {
        console.log(res.data)
        _this.tableData = res.data
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
      this.form.teaNum = selfData.teaNum
      this.form.name = selfData.name
      this.form.sex = selfData.sex
      this.form.age = selfData.age
      this.form.moblie = selfData.moblie
      this.form.className = selfData.className
      this.form.speciality = selfData.speciality

      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res)
      // })
    },

    openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true

    },

    delData() {
      this.sendRequest('/teacher/delScore',{id: this.delId})
      this.dialogVisible=false
      this.getAllData()
    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.teaNum || document.getElementsByClassName('sc')[0].value == value.teacherName ||
          document.getElementsByClassName('sc')[0].value == value.sex ||
          document.getElementsByClassName('sc')[0].value == value.className ||
          document.getElementsByClassName('sc')[0].value == value.speciality
      })
      // console.log(result)
      _this.tableData = result
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

