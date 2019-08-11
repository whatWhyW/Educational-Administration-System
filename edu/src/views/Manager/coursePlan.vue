<template>
	<div>
		<!-- <div style="height: 90px;">
			<span class='font'>欢迎进入本校教学课程计划模块</span>
			<p class='text'>尊敬的管理员您好，您可以根据当下企业最需要的技术去设置相应的课程</p>
		</div> -->
		<el-row>
			<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
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
<el-table-column
label="操作">
<template slot-scope="scope">
	<el-button type="primary" @click="editData(scope.$index)">修改</el-button>
	<el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
</template>
</el-table-column>
</el-table>



<el-dialog title="请填写课程计划" :visible.sync="dialogFormVisible" style="height: 100%">
	<el-form :model="form" :rules="rules" ref="form">
		<el-form-item label="课程号" prop="courseId">
			<el-input v-model="form.courseId" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="课程名" prop="courseName">
			<el-input v-model="form.courseName" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="学时（天）" prop="courseTime">
			<el-input v-model="form.courseTime" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="适应阶段" prop="courseGrade">
			<el-select style='width: 100%' v-model="form.courseGrade" placeholder="请选择是否启用">
				<el-option label="无知" value="无知" autocomplete="off"></el-option>
				<el-option label="了解" value="了解" autocomplete="off"></el-option>
				<el-option label="熟悉" value="熟悉" autocomplete="off"></el-option>
				<el-option label="掌握" value="掌握" autocomplete="off"></el-option>
				<el-option label="精通" value="精通" autocomplete="off"></el-option>
			</el-select>
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
				dialogVisible: false,
				tableData: [],
				dialogFormVisible: false,
	      isEdit: false, //是否修改
	      editId: '',
	      delId: '',
	      form: {
      	courseID: "",
      	courseName: '',
      	courseTime: 0,
      	courseGrade: '',
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
			this.$http.get('/manager/coursePlansAll').then(function (res) {
				console.log(res)
				_this.tableData = res.data
			})
			.catch(function (error) {
				console.log(error)
			})
		},
    // 发送请求封装的一个函数
    sendRequest(url, opt={}) {
    	var _this = this
    	this.$http.post(url, opt).then(function (res) {
        // console.log(res)
        // 将数据存储起来
        if(url === '/manager/addCoursePlans') {
          // console.log("添加用户信息")
          _this.tableData.push(res.data)
      } else if(url === '/manager/editCoursePlans') {
          // console.log("编辑用户信息")
          _this.getAllData()
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
    				let opt = that.form;
    				opt._id = that.editId
            // 修改
            that.sendRequest('/manager/editCoursePlans', opt)
              // this.getAllData()
          } else {
              // 新增
              that.sendRequest('/manager/addCoursePlans', that.form)
              // this.getAllData()
          }
          // that.getAllData()
          that.dialogFormVisible = false
      } else {
      	console.log('error submit!!');
      	return false;
      }
  });  
    },
    editData(index) {
    	this.editId = this.tableData[index]._id
    	this.dialogFormVisible = true
    	this.isEdit = true
    	this.form.courseId = this.tableData[index].courseId
    	this.form.courseName = this.tableData[index].courserName
    	this.form.courseTime = this.tableData[index].courseTime
    	this.form.courseGrade = this.tableData[index].courseGrade
      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res.data)
      // })
  },
  openDialog(index) {
  	this.delId = this.tableData[index]._id
  	this.dialogVisible = true
  	this.courseName = this.tableData[index].courseName

  },
  delData() {
  	var _this = this
  	this.$http.post('/manager/delCoursePlans', {courseName: this.courseName}).then(function (res) {
  		_this.tableData = res.data.data
        // console.log(res.data.data)
    })
  	this.dialogVisible=false
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
    	// console.log('升序')
    	this.tableData.sort(objectArraySort('courseTime'))
	  //   this.tableData.sort(function(a, b){
			// 	return a > b ? 1 : -1 // 这里改为大于号
			// })
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