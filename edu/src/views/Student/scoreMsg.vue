<template>
	<div>
		<el-row style="margin: 0 auto;">
          <!-- <el-button type="primary" @click="getAllData" style=''>点击查看班级成绩</el-button> -->
          <div class="searchbox" style="display: inline-block; float: right;">
            <input class="sc" type="text" placeholder="请输入课程名" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
            <el-button type="warning" plain @click="searchData">搜索</el-button>
            <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C'>成绩升序</el-button>
            <el-button type="warning" @click="sortDown()"  style='background-color: #FBF0EE; color: #E6A23C'>成绩降序</el-button>
            <el-button type="danger" plain @click="getAllData">刷新</el-button>
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
            label="时间">
          </el-table-column>
         <!--  <el-table-column
            prop="teacherName"
            label="操作者">
          </el-table-column> -->
        </el-table>
	</div>
</template>
<style>
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
      tableData: [],
      tableData1: [],
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
    // 获取所有的班级课表
    getAllData() {
      var _this = this
       this.$http.post('/student/scoreAll', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function(res) {
          // console.log(res)
            _this.tableData = res.data
        
        }).catch(function(error) {
          console.log(error)
      })
    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.courseName 
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
  mounted: function() {
    this.getAllData();
  }
};
</script>

