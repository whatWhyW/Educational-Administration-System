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
        date: [
            { required: true, message: '请正确填写时间', trigger: 'blur' },
        ],
        className: [
            { required: true, message: '请填写班级名', trigger: 'blur' },
        ],
      }
    }
  },
methods: {
		// 获取所有的用户信息
	getAllData() {
		var _this = this
      this.$http.post('/teacher/findMsg', {teacherName: JSON.parse(window.localStorage.teaInfo).username}).then(function (res) {
        // console.log(res)
        // class = res.data.className;
        // _this.tableData = res.data
        _this.$http.post('/teacher/classAll', {className: res.data.className}).then(function (res) {
          console.log(res)
          _this.tableData = res.data
          if(res.data.length === 0) {
            alert('您还没有任职的班级，请联系教学管理者')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
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
	},
}
</script>