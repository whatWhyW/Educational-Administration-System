<template>
  <div>
    <!-- <div style="height: 90px">
      <span class='font'>欢迎进入本校班级管理模块</span>
      <p class='text'>尊敬的管理员您好，班级的存在与设置记录了学校的成长，您只可以进行查询、增加、修改，请谨慎操作(如勿操作，请联系后台管理员)</p>
    </div> -->
    <div>
	    <el-row>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
	      <div class="searchbox" style="display: inline-block; float: right;">
	        <input class="sc" type="text" placeholder="请输入班级编号或班级名" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
          <el-button type="warning" plain @click="searchData">搜索</el-button>
          <el-button type="danger" plain @click="getAllData()">刷新</el-button>
	      </div>
		  </el-row>
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
	       <el-table-column
	        label="操作">
	        <template slot-scope="scope">
	          <el-button type="primary" @click="editData(scope.$index)">修改</el-button>
	          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
	        </template>
	      </el-table-column>
	    </el-table>
	  

		<div style="margin-top: -60px">
      <el-dialog title="请填写班级信息" :visible.sync="dialogFormVisible" style="height: 100%；">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="班级编号" prop="classId">
            <el-input v-model="form.classId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级名" prop="className">
                <el-input v-model="form.className" autocomplete="off"></el-input>
              </el-form-item>
          <el-form-item label="教室" prop="classroom">
                <el-input v-model="form.classroom" autocomplete="off"></el-input>
              </el-form-item>
          <el-form-item label="学生数量" prop="stuNumber">
                <el-input v-model="form.stuNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="班主任" prop="teacherName">
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
    </div>

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
      	classId: '',
      	// stage: '',
      	className: '',
        classroom: "",
        stuNumber: '',
        teacherName: '',
        remark: ''
      },
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
      this.$http.get('/manager/classesAll').then(function (res) {
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
        if(url === '/manager/addClasses') {
          console.log("添加用户信息")
          _this.tableData.push(res.data)
        } else if(url === '/manager/editClasses') {
          console.log("编辑用户信息")
          _this.getAllData()
        } else if(url === '/manager/delClasses') {
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
            let opt = that.form;
            opt._id = that.editId
            // 修改
              that.sendRequest('/manager/editClasses', opt)
              // this.getAllData()
            } else {
              // 新增
              that.sendRequest('/manager/addClasses', that.form)
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

  openDialog(index) {
    this.delId = this.tableData[index]._id
    this.dialogVisible = true

  },

  delData() {
    this.sendRequest('/manager/delClasses',{id: this.delId})
    this.dialogVisible=false
    this.getAllData()
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

  // 模糊查询
  searchData() {
  	var _this = this
  	console.log(_this.tableData)
  	var result = _this.tableData.filter(function(value, index, arr) {
  		// console.log(value)
  		// console.log(document.getElementsByClassName('sc')[0].value)
  		return document.getElementsByClassName('sc')[0].value == value.classId 
  			|| document.getElementsByClassName('sc')[0].value == value.className 
  	})
  	console.log(result)
  	_this.tableData = result
  }


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