<template>
	<div>
		<!-- <div style="height: 90px">
			<span class='font'>欢迎进入本校课表计划管理模块</span>
			<p class="text">本校采取上二休一的教学模式，为了更清晰课程时间与休息日，请制定此表！</p>
		</div> -->
		<el-row>
			<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
			<div class="searchbox" style="display: inline-block; float: right;">
				<input class="sc" type="text" placeholder="请输入是否上课或进行时间检索" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
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
				prop="time"
				label="时间">
				</el-table-column>
				</el-table-column>
				<el-table-column
				prop="tea"
				label="是否上课">
				</el-table-column>
				<el-table-column
				prop="exam"
				label="是否考试">
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


			<el-dialog title="请填写教育课程表" :visible.sync="dialogFormVisible" style="height: 100%">
				<el-form :model="form" :rules="rules" ref="form">

					<el-form-item label="时间" prop="time">
						<el-date-picker v-model="form.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style='width: 100%'> </el-date-picker>  
						<!-- <el-input v-model="form.time" autocomplete="off"></el-input> -->
					</el-form-item>
			    <el-form-item label="请选择是否上课" prop="tea">
			      	<el-select style='width: 100%' v-model="form.tea" placeholder="请选择是否启用">
			      		<el-option label="是" value="是" autocomplete="off"></el-option>
			      		<el-option label="否" value="否" autocomplete="off"></el-option>
			      	</el-select>
			    </el-form-item>
			    <el-form-item label="请选择是否考试" prop="exam">
			      	<el-select style='width: 100%' v-model="form.exam" placeholder="请选择是否启用">
			      		<el-option label="是" value="是" autocomplete="off"></el-option>
			      		<el-option label="否" value="否" autocomplete="off"></el-option>
			      	</el-select>
			    </el-form-item>
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
        time: '',
        tea: "",
        exam: '',
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
        if(url === '/manager/addCourseSchedule') {
          // console.log("添加用户信息")
          // console.log(res)
          _this.tableData.push(res.data)
        } else if(url === '/manager/editCourseSchedule') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } else if(url === '/manager/delCourseSchedule') {
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
              that.sendRequest('/manager/editCourseSchedule',opt)
            }else {
              // 新增
              that.sendRequest('/manager/addCourseSchedule',that.form)
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
      this.$http.get('/manager/courseScheduleAll').then(function (res) {
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
      this.sendRequest('/manager/delCourseSchedule',{id: this.delId})
      this.dialogVisible=false
      this.getAllData()
    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.teaNum || document.getElementsByClassName('sc')[0].value == value.teacherName ||
          document.getElementsByClassName('sc')[0].value == value.tea ||
          document.getElementsByClassName('sc')[0].value == value.time 
      })
      // console.log(result)
      _this.tableData = result
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