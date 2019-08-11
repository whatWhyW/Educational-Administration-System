<!-- 教学者能够查看成绩、修改成绩和删除成绩（当班级毕业不存在的时候他们的成绩可以销毁） -->
<template>
    <div class="index">
      
        <el-row style="margin: 0 auto;">
          <div class="searchbox" style="display: inline-block; float: right;">
            <input class="sc" type="text" placeholder="请输入学生姓名或课程名或班级" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
            <el-button type="warning" plain @click="searchData">搜索</el-button>
            <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C'>成绩升序</el-button>
            <el-button type="warning" @click="sortDown()"  style='background-color: #FBF0EE; color: #E6A23C'>成绩降序</el-button>
            <el-button type="danger" plain @click="getAllData()">刷新</el-button>
          </div>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="className"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名">
          </el-table-column>
          <el-table-column
            prop="score"
            label="成绩">
          </el-table-column>
          <el-table-column
            prop="time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="操作者">
          </el-table-column>
          <el-table-column
	        label="操作">
		        <template slot-scope="scope">
		          <el-button type="primary" @click="editData(scope.$index)">修改</el-button>
		          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
		        </template>
		    </el-table-column>
        </el-table>

        

        <el-dialog title="填写成绩表" :visible.sync="dialogFormVisible" style="height: 100%">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="班级" prop="className" autocomplete="off">
              <el-input v-model="form.className" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="studentName" autocomplete="off">
              <el-input v-model="form.studentName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="课程名" prop="courseName">
              <el-input v-model="form.courseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成绩" prop="score">
                <el-input v-model="form.score" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" prop="time">
                  <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择操作时间"
                    default-time="12:00:00"
                    style='width: 80%'
                    value-format="yyyy-MM-dd HH:mm"
                    >
                  </el-date-picker>
                  <!--  <el-input v-model="form.date" autocomplete="off"></el-input> -->
            </el-form-item>
            <el-form-item label="操作者" prop="teacherName">
              <el-input v-model="form.teacherName" autocomplete="off"></el-input>
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
      tableData1: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
        studentName: '',
        teacherName: '',
        courseName: "",
        className: '',
        score: null,
        time: '',
      },
      rules: {
        // score: [
        //   { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        // ],
        teacherName: [
          { require: true,  message: '必须填写您的姓名', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
        if(url === '/manager/editScore') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } else if(url === '/manager/delScore') {
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
              that.sendRequest('/manager/editScore',opt)
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
      this.$http.get('/manager/scoreAll').then(function (res) {
        // console.log(res.data)
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
      this.form.className = selfData.className
      this.form.studentName = selfData.studentName
      this.form.courseName = selfData.courseName
      this.form.score = selfData.score
      this.form.time = selfData.time
      this.form.teacherName = selfData.teacherName

      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res)
      // })
    },

    openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true

    },

    delData() {
      this.sendRequest('/manager/delScore',{id: this.delId})
      this.dialogVisible=false
      this.getAllData()
    },



    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.courseName 
        || document.getElementsByClassName('sc')[0].value == value.studentName
        || document.getElementsByClassName('sc')[0].value == value.className
      })
      // console.log(result)
      _this.tableData = result
    },
     sortUp() {
      var objectArraySort = function(keyName) {
        return function(objectN, objectM) {
          var valueN = objectN[keyName]
          var valueM = objectM[keyName]
          if (valueN > valueM) return 1
          else if (valueN < valueM) return -1
          else return 0
        }
      }
      this.tableData.sort(objectArraySort('score'))
    },
    sortDown() {
      var objectArraySort = function(keyName) {
        return function(objectN, objectM) {
          var valueN = objectN[keyName]
          var valueM = objectM[keyName]
          if (valueN < valueM) return 1
          else if (valueN > valueM) return -1
          else return 0
        }
      }
      this.tableData.sort(objectArraySort('score'))
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

