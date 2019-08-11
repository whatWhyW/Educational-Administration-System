<template>
	<div>
		<el-row>
			<div class="searchbox" style="display: inline-block; float: right;">
				<input class="sc" type="text" placeholder="课程班级、课程日期、课程内容及课程教师" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
				<el-button type="warning" plain @click="searchData">搜索</el-button>
				<el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C' >时间升序</el-button>
				<el-button type="warning" @click="sortDown()" style='background-color: #FBF0EE; color: #E6A23C' >时间降序</el-button>
				<el-button type="danger" plain @click="getAllData()">刷新</el-button>
			</div>
		</el-row>
		<div>
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
      rules: {
       
      }
    }
  },
  methods: {

    // 请求所有数据
    getAllData() {
      var _this = this
      this.$http.get('/teacher/classScheduleAll').then(function (res) {
        console.log(res)
        _this.tableData = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.time 
        || document.getElementsByClassName('sc')[0].value == value.course ||
        document.getElementsByClassName('sc')[0].value == value.class ||
        document.getElementsByClassName('sc')[0].value == value.teacherName 
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
