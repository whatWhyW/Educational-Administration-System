<template>
  <div>
    <el-row>
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <div class="searchbox" style="display: inline-block; float: right;">
        <input class="sc" type="text" placeholder="请输入课程名或考试时间" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;" />
        <el-button type="warning" plain @click="searchData">搜索</el-button>
        <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C'>时间升序</el-button>
        <el-button type="warning" @click="sortDown()"  style='background-color: #FBF0EE; color: #E6A23C'>时间降序</el-button>
        <el-button type="danger" plain @click="getAllData()">刷新</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="courseName" label="课程名">
        </el-table-column>
         <el-table-column prop="className" label="考试班级">
        </el-table-column>
        <el-table-column prop="score" label="成绩分配">
        </el-table-column>
        <el-table-column prop="catagory" label="考试类型">
        </el-table-column>
        <el-table-column prop="teacherName" label="负责教师">
        </el-table-column>
        <el-table-column prop="time" label="考试时间">
        </el-table-column>
      </el-table>
      
      <el-dialog title="请填写考试计划" :visible.sync="dialogFormVisible" style="height: 100%">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="课程名" prop="courseName">
            <el-input v-model="form.courseName" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="考试班级" prop="className">
            <el-input v-model="form.className" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成绩分配" prop="score">
            <el-input v-model="form.score" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="考试类型" prop="catagory">
	          <el-select style='width: 100%; position: absolute; left: 136px' v-model="form.catagory" placeholder="请选择考试类型">
	            <el-option label="笔试" value="笔试" autocomplete="off"></el-option>
	            <el-option label="面试" value="面试" autocomplete="off"></el-option>
	          </el-select>
	        </el-form-item>
          <el-form-item label="负责教师" prop="teacherName">
            <el-input v-model="form.teacherName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="考试时间" prop="time">
            <el-date-picker
				      v-model="form.time"
				      type="datetime"
				      style="width:80%"
				      value-format="yyyy-MM-dd HH:mm"
				      placeholder="选择考试时间">
				    </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFrom">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      dialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
        score: "",
        className: '',
        courseName: '',
        catagory: '',
        time: '',
        teacherName: ''
      },
      rules: {
        courseName: [
          { required: true, message: '请填写课程名', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    // 发送请求封装的一个函数
    sendRequest(url, opt = {}) {
      var _this = this
      this.$http.post(url, opt).then(function(res) {
          // console.log(res)
          // 将数据存储起来
          if (url === '/teacher/addExamPlan') {
          	console.log(res);
            // console.log("添加用户信息")
            _this.tableData.push(res.data)
          } 
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitFrom() {
      const that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
            // 新增
            that.sendRequest('/teacher/addExamPlan', that.form)
            // this.getAllData()
          // that.getAllData()
          that.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取所有的用户信息
    getAllData() {
      var _this = this
       this.$http.post('/teacher/findMsg', {teacherName: JSON.parse(window.localStorage.teaInfo).username}).then(function(res) {
          console.log(res)
          _this.$http.post('/teacher/classExamPlanAll', {className: res.data.className}).then(function(res) {
	          console.log(res)
	          _this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
        })
    },

    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.courseName || document.getElementsByClassName('sc')[0].value == value.time
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
      this.tableData.sort(objectArraySort('time'))
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
      this.tableData.sort(objectArraySort('time'))

    },

  },

  watch: {
    dialogFormVisible() {
      if (!this.dialogFormVisible) this.isEdit = false
    }
  },

  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    this.getAllData();
  }
}

</script>
