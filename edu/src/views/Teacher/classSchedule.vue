<template>
	<div>
		<el-row>
			<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
			<div class="searchbox" style="display: inline-block; float: right;">
				<input class="sc" type="text" placeholder="请搜索课程内容或上课时间" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
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
				<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="editData(scope.$index)">修改</el-button>
					<el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
				</template>
				</el-table-column>
			</el-table>


			<el-dialog title="请填写班级课程表" :visible.sync="dialogFormVisible" style="height: 100%">
				<el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="班级" prop="className">
            <el-input v-model="form.className" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="时间" prop="time">
						<el-date-picker v-model="form.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style='width: 100%'> </el-date-picker>  
						<!-- <el-input v-model="form.time" autocomplete="off"></el-input> -->
					</el-form-item>
				  <el-form-item label="课程内容" prop="course">
            <el-input v-model="form.course" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="教师" prop="teacherName">
            <el-input v-model="form.teacherName" autocomplete="off"></el-input>
          </el-form-item>
				  <el-form-item label="备注" prop="remark">
				  	<el-input v-model="form.remark" autocomplete="off"></el-input>
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
      dialogVisible:false,
      tableData: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
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
    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
        // console.log(res)
         // 将数据存储起来
        if(url === '/teacher/addClassSchedule') {
          // console.log("添加用户信息")
          // console.log(res)
          _this.tableData.push(res.data)
        } else if(url === '/teacher/editClassSchedule') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } else if(url === '/teacher/delClassSchedule') {
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
              that.sendRequest('/teacher/editClassSchedule',opt)
            }else {
              // 新增
              that.sendRequest('/teacher/addClassSchedule',that.form)
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
      this.$http.get('/teacher/classScheduleAll').then(function (res) {
        console.log(res)
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
      this.form.tea = selfData.tea
      this.form.className = selfData.className
      this.form.time = selfData.time
      this.form.exam = selfData.exam
      this.form.remark = selfData.remark
      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res)
      // })
    },
    openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true
    },

    delData() {
      this.sendRequest('/teacher/delClassSchedule',{id: this.delId})
      this.dialogVisible=false
      this.getAllData()
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