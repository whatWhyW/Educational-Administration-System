<template>
	<div>
		<span class='font'>欢迎进入本校教学计划分配模块</span>
		<div>
			<el-table
	      :data="tableData"
	      stripe
	      style="width: 100%">
	      <el-table-column
	        prop="courseName"
	        label="课程名">
	      </el-table-column>
	      <!-- <el-table-column
	        prop="stage"
	        label="适应阶段">
	      </el-table-column> -->
	      </el-table-column>
	      <el-table-column
	        prop="teacherName"
	        label="指派教师">
	      </el-table-column>
	      <el-table-column
	        prop="proceed"
	        label="是否启用">
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
	  <el-row>
	    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
	  </el-row>

		<el-dialog title="请填写教学任务信息" :visible.sync="dialogFormVisible" style="height: 100%">
	      <el-form :model="form" :rules="rules" ref="form">
	      	<el-form-item label="课程名" prop="courseName">
	          <el-input v-model="form.courseName" autocomplete="off"></el-input>
	        </el-form-item>
	        <!-- <el-form-item label="适应阶段" prop="stage">
	          <el-input v-model="form.stage" autocomplete="off"></el-input>
	        </el-form-item> -->
	        <el-form-item label="指派教师" prop="teacherName">
	          <el-input v-model="form.teacherName" autocomplete="off"></el-input>
	        </el-form-item>
	       <!--  <el-form-item label="类型" prop="category">
	          <el-input v-model="form.category" autocomplete="off"></el-input>
	        </el-form-item> -->
	        <el-form-item label="请选择是否启用" prop="proceed">
	          <el-select style='width: 100%' v-model="form.proceed" placeholder="请选择是否启用">
	            <el-option label="是" value="true" autocomplete="off"></el-option>
	            <el-option label="否" value="false" autocomplete="off"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="操作时间(请按照2019.5.20的格式填写数据，否则将无效)" prop="date">
	          <el-input v-model="form.date" autocomplete="off"></el-input>
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
      	courseName: "",
      	// stage: '',
      	teacherName: '',
        proceed: "",
        remark: '',
        date: ''
      },
      rules: {
        date: [
            { required: true, message: '请正确填写时间', trigger: 'blur' },
        ],
      }
    }
  },
	methods: {
		// 获取所有的用户信息
		getAllData() {
			var _this = this
      this.$http.get('/manager/teachTaskAll').then(function (res) {
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
        if(url === '/manager/addTeachTaskPlans') {
          console.log("添加用户信息")
          // if(res.data.data.message === '该课程名已经存在！') {
          // 	alert("该课程名已经存在，请重新操作")
          // 	return
          // }
          _this.tableData.push(res.data)
        } else if(url === '/manager/editTeachTaskPlans') {
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
              that.sendRequest('/manager/editTeachTaskPlans', opt)
              // this.getAllData()
            } else {
              // 新增
              that.sendRequest('/manager/addTeachTaskPlans', that.form)
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
      this.form.courseName = this.tableData[index].courseName
      this.form.teacherName = this.tableData[index].teacherName
      this.form.proceed = this.tableData[index].proceed
      this.form.remark = this.tableData[index].remark
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
      this.$http.post('/manager/delTeachTaskPlans', {courseName: this.courseName}).then(function (res) {
      	// console.log(res.data.data)
      	// _this.tableData = res.data.data
      	_this.getAllData()
      	console.log('执行删除')
        
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