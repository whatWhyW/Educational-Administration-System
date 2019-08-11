<template>
	<div>
			<el-row>
			    <div class="searchbox" style="display: inline-block; float: right;">
			      <input class="sc" type="text" placeholder="请输入课程名或学时天数或适应阶段" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
			      <el-button type="warning" plain @click="searchData">搜索</el-button>
			      <el-button type="warning" @click="sortUp()"  style='background-color: #FBF0EE; color: #E6A23C' >课时升序</el-button>
			      <el-button type="warning" @click="sortDown()" style='background-color: #FBF0EE; color: #E6A23C' >课时降序</el-button>
			      <el-button type="danger" plain @click="getAllData()">刷新</el-button>
			    </div>
	 		</el-row>
		<div>
			<el-table
	      :data="tableData"
	      stripe
	      style="width: 100%">
	      <el-table-column
	        prop="courseId"
	        label="课程号">
	      </el-table-column>
	      </el-table-column>
	      <el-table-column
	        prop="courseName"
	        label="课程名">
	      </el-table-column>
	      <el-table-column
	        prop="courseTime"
	        label="学时（天）">
	      </el-table-column>
	      <el-table-column
	        prop="courseGrade"
	        label="适应阶段">
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
      	courseID: "",
      	courseName: '',
        courseTime: 0,
        courseGrade: '',
      },
      rules: {
      }
    }
  },
  methods: {
		getAllData() {
			var _this = this
	      this.$http.get('/manager/coursePlansAll').then(function (res) {
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
        return document.getElementsByClassName('sc')[0].value == value.courseName || document.getElementsByClassName('sc')[0].value == value.courseTime || document.getElementsByClassName('sc')[0].value == value.courseGrade
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
    	this.tableData.sort(objectArraySort('courseTime'))
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
    	this.tableData.sort(objectArraySort('courseTime'))
	 
    },

  },

  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    this.getAllData();
  }
}
</script>