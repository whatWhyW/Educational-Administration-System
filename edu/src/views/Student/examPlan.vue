<template>
  <div>
    <el-row>
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
      tableData: [],
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
    
    // 获取所有的用户信息
    getAllData() {
      var _this = this
      this.$http.post('/student/findMsg', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function(res) {
          console.log(res)
          _this.$http.post('/student/examPlanAll', {className: res.data.className}).then(function(res) {
	          console.log(res)
	          _this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
          // _this.tableData = res.data
          // examPlanAll
        })
        .catch(function(error) {
          console.log(error)
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
