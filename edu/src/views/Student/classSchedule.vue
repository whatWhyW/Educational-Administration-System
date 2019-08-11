<template>
  <div>
     <!--  <p class="font">以下是您的课程表，祝您学习快乐</p> -->
      <div class="searchbox" style="display: inline-block; float: right;">
        <input class="sc" type="text" placeholder="请搜索课程内容或上课时间" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
        <el-button type="warning" plain @click="searchData">搜索</el-button>
        <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C' >时间升序</el-button>
        <el-button type="warning" @click="sortDown()" style='background-color: #FBF0EE; color: #E6A23C' >时间降序</el-button>
        <el-button type="danger" plain @click="getAllData()">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
        prop="className"
        label="班级">
        </el-table-column>
        <el-table-column
        prop="time"
        label="时间">
        </el-table-column>  
        <el-table-column
        prop="course"
        label="课程内容">
        </el-table-column>
        <el-table-column
        prop="teacherName"
        label="教师">
        </el-table-column>
        <el-table-column
        prop="remark"
        label="备注">
        </el-table-column>
      </el-table>
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
.el-table th, .el-table tr {
  height: 60px;
}
</style>
<script>
export default {
  name: "index",
  data() {
    return {
      tableData: [],
      form: {
        className: '',
        time: '',
        course: '',
        teacherName: '',
        remark: "",
      },
      cls: [],
      rules: {
       
      }
    }
  },
  methods: {
    // 请求所有数据
    // 这里去数据库中先查询学生所在的班级，在根据班级返回课表；
    getAllData() {
      var _this = this
      this.$http.post('/student/findMsg', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function (res) {
        console.log(res)
        // class = res.data.className;
        // _this.tableData = res.data
        _this.$http.post('/student/classScheduleAll', {className: res.data.className}).then(function (res) {
          console.log(res)
          if(res.data.length === 0) {
            alert('Sorry,该系统还没有您的班级课表，请联系班主任');
            return;
          }
          console.log(res.data.data);
          _this.tableData = res.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
      })
      console.log(this.cls)
      

    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.time || document.getElementsByClassName('sc')[0].value == value.course 
      })
      // console.log(result)
      _this.tableData = result
    },
  sortUp() {
    var objectArraySort = function (keyName) {
      return function (objectN, objectM) {
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
    var objectArraySort = function (keyName) {
      return function (objectN, objectM) {
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
      if(!this.dialogFormVisible) this.isEdit=false
    }
  },
  mounted: function() {

    // 组件创建时候去获取所有的用户数据
    this.getAllData();
  }
}
</script>