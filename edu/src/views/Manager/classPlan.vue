<template>
	<div>
		<!-- <div style="height: 90px">
			<span class='font'>欢迎进入本校班级安排模块</span>
			<p class='text'>尊敬的管理员您好，现有教室数量为 7 个， 您可以在此基础之上去作出决策</p>
		</div> -->
		<div>		
	    	<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
		</div>
		<div>
			<el-table
	      :data="tableData"
	      stripe
	      style="width: 100%">
	      <!-- <el-table-column
	        prop="className"
	        label="班级名">
	      </el-table-column> -->
	      <!-- <el-table-column
	        prop="stage"
	        label="适应阶段">
	      </el-table-column> -->
	     
	      <el-table-column
	        prop="classRroceed"
	        label="是否开设新班">
	      </el-table-column>
	      <el-table-column
	        prop="date"
	        label="操作时间">
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
	  

		<el-dialog title="请填写教学任务信息" :visible.sync="dialogFormVisible" style="">
	      <el-form :model="form" :rules="rules" ref="form">
	      	

	        <el-form-item label="是否开设新版" prop="classProceed">
	          <el-select style='width: 80%;' v-model="form.classRroceed" placeholder="请选择是否开设新版">
	            <el-option label="是" value='是' autocomplete="off"></el-option>
	            <el-option label="否" value='否' autocomplete="off"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="操作时间" prop="date">
	        	<el-date-picker
			      v-model="form.date"
			      type="datetime"
			      placeholder="选择日期时间"
			      default-time="12:00:00"
					style='width: 80%'
					value-format="yyyy-MM-dd HH:mm"
			      >
			    </el-date-picker>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
	          <el-input  style='width: 80%;' v-model="form.remark" autocomplete="off"></el-input>
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
      dialogVisible: false,
      tableData: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
      	classNumber: null,
      	// stage: '',
      	classRroceed: '',
        date: "",
        remark: '',
      },
      rules: {
        classRroceed: [
            { required: true, message: '请填写是否开设新版', trigger: 'blur' },
        ],
        classNumber: [
          { type: 'number', message: '年龄必须为数字值'}
        ],
      }
    }
  },
	methods: {
		// 获取所有的用户信息
		getAllData() {
			var _this = this
      this.$http.get('/manager/classPlanAll').then(function (res) {
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
        console.log(res)
        // 将数据存储起来
        if(url === '/manager/addClassPlan') {
          console.log("添加用户信息")
          _this.tableData.push(res.data)
        } else if(url === '/manager/editClassPlan') {
          console.log("编辑用户信息")
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
              that.sendRequest('/manager/editClassPlan', opt)
              // this.getAllData()
            } else {
              // 新增
              that.sendRequest('/manager/addClassPlan', that.form)
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
      const selfData = this.tableData[index]
      this.editId = selfData._id
      this.dialogFormVisible = true
      this.isEdit = true
      this.form.classNumber = this.tableData[index].classNumber
      this.form.classRroceed = this.tableData[index].classRroceed
      this.form.date = this.tableData[index].date
      this.form.remark = this.tableData[index].remark
    },
	openDialog(index) {
		console.log('执行')
      this.delId = this.tableData[index]._id
      this.dialogVisible = true
      // this.form = this.tableData[index].from
      //  console.log('执行')

	},
	delData() {
    var _this = this
    // this.delId = this.tableData[index]._id
      this.$http.post('/manager/delClassPlan', {id: this.delId}).then(function (res) {
      	console.log('执行了')
        _this.tableData = res.data.data
      })
	    this.dialogVisible=false
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