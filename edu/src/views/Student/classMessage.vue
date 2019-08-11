<template>
  <div>
    <el-row>
      <span class="font">以下是您所任职班级的信息</span>
      <div class="searchbox" style="display: inline-block; float: right;">
        <el-button type="danger" plain @click="getAllData()">刷新</el-button>
      </div>
	  </el-row>
		<el-table
      :data="tableData"
      stripe
      style="width: 100%; height: 100%">
      <!-- <el-table-column
        prop="className"
        label="班级名">
      </el-table-column> -->
      <!-- <el-table-column
        prop="stage"
        label="适应阶段">
      </el-table-column> -->
      <el-table-column
        prop="classId"
        label="班级编号">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名">
      </el-table-column>
      <el-table-column
        prop="classroom"
        label="教室">
      </el-table-column>
      <el-table-column
        prop="stuNumber"
        label="学员数量">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="班主任">
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

</style>
<script>
export default {
	name: "index",
	data() {
    return {
      tableData: [],
      form: {
      	classId: '',
      	// stage: '',
      	className: '',
        classroom: "",
        stuNumber: '',
        teacherName: '',
        remark: ''
      },
      cls: [],
      rules: {
      }
    }
  },
methods: {
		// 获取所有的用户信息
	getAllData() {
		var _this = this
      this.$http.post('/student/findMsg', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function (res) {
      	// console.log(res);
        _this.$http.post('/student/classAll', {className: res.data.className}).then(function (res) {
          console.log(res)
          if(res.data.length === 0) {
            alert('Sorry, 还没有您的班级信息，请联系教学管理者');
            return
          }
          _this.tableData = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
      })
  
  },
  },	
  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    this.getAllData();
	},
}
</script>