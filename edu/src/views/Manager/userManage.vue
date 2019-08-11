<template>
	<div>
		<!-- <div style='height:90px'>
      <span class='font'>欢迎进入账号信息管理模块</span>
      <p class="text">小贴士：定期清理无效账户，能够提升系统效率哦</p>  
    </div> -->
    <el-row>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <div class="searchbox" style="display: inline-block; float: right;">
          <input class="sc" type="text" placeholder="请输入用户名或用户类型" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
          <el-button type="warning" plain @click="searchData">搜索</el-button>
          <el-button type="danger" plain @click="getAllData()">刷新</el-button>
        </div>
    </el-row>
		<el-table
	      :data="tableData"
	      stripe
	      style="width: 100%">
	   		<el-table-column
	        prop="username"
	        label="账户名">
	      </el-table-column>
	      <el-table-column
	        prop="password"
	        label="密码">
	      </el-table-column>
	      <el-table-column
	        prop="category"
	        label="类型">
	      </el-table-column>
	       <el-table-column
	        label="操作">
	        <template slot-scope="scope">
	          <el-button type="primary" @click="editData(scope.$index)">修改</el-button>
	          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
	        </template>
	      </el-table-column>
    </el-table>
    

	<el-dialog title="填写你的信息" :visible.sync="dialogFormVisible" style="height: 100%">
      <el-form :model="form" :rules="rules" ref="form">
      	<el-form-item label="账户名" prop="username" autocomplete="off">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
       <!--  <el-form-item label="类型" prop="category">
          <el-input v-model="form.category" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="请选择类型" prop="category">
          <el-select style='width: 100%' v-model="form.category" placeholder="请选择注册类型">
            <el-option label="学生" value="student" autocomplete="off"></el-option>
            <el-option label="教师" value="teacher" autocomplete="off"></el-option>
            <!-- <el-option label="教学管理者" value="manager" autocomplete="off"></el-option> -->
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
      	username: '',
        password: "",
        category: "",
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          // { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
	methods: {
		// 获取所有的用户信息
		getAllData() {
			var _this = this
	      this.$http.get('/users/all').then(function (res) {
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
        if(url === '/users/addUsers') {
          console.log("添加用户信息")
          _this.tableData.push(res.data)
        } else if(url === '/users/editUsers') {
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
              that.sendRequest('/users/editUsers', opt)
              // this.getAllData()
            } else {
              // 新增
              that.sendRequest('/users/addUsers', that.form)
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
      // const selfData = this.tableData[index]
      // this.editId = selfData._id
      this.editId = this.tableData[index]._id
      this.dialogFormVisible = true
      this.isEdit = true
      this.form.username = this.tableData[index].username
      this.form.password = this.tableData[index].password
      this.form.category = this.tableData[index].category
      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res.data)
      // })
    },
	  openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true
      this.username = this.tableData[index].username

	  },
	  delData() {
      var _this = this
      this.$http.post('/users/delUsers', {username: this.username}).then(function (res) {
       _this.tableData = res.data.data
      })
	    this.dialogVisible=false
	  },

    // 模糊查询
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.username 
          || document.getElementsByClassName('sc')[0].value == value.category 
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
	}
}
</script>