<template>
  <div class="index">
    <el-row  style="margin: 0 auto;">
      <el-button type="primary" @click="dialogFormVisible = true" >新增</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
   		<el-table-column
        prop="proceed"
        label="是否开启测评">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名">
      </el-table-column>
      <!-- <el-table-column
        prop="teacherName"
        label="被测教师名">
      </el-table-column> -->
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editData(scope.$index)">修改</el-button>
          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>

    
    <el-dialog title="填写测评计划" :visible.sync="dialogFormVisible" style="height: 100%">
      <el-form :model="form" :rules="rules" ref="form">
      	<el-form-item label="是否开启测评" prop="proceed">
            <el-select style='width: 100%; position: absolute; left: 138px' v-model="form.proceed" placeholder="请选择是否开启测评">
              <el-option label="是" value="是" autocomplete="off"></el-option>
              <el-option label="否" value="否" autocomplete="off"></el-option>
            </el-select>
        </el-form-item>
      	<el-form-item label="班级名" prop="className" autocomplete="off">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" prop="time">
        	<el-date-picker class='time'
				type="datetime"
				placeholder="选择日期时间"
				value-format="yyyy-MM-dd HH:mm"
				style='width: 80%'
				v-model="form.time"
				>
			</el-date-picker>
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
      dialogVisible:false,
      tableData: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
      	proceed: '',
      	className: '',
        time: "",
      },
      rules: {
        proceed: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        className: [
          { required: true, message: '必填', trigger: 'blur' },
        ]
      }
    }
  },

  methods: {
    sendRequest(url, opt={}) {
      var _this = this
      this.$http.post(url, opt).then(function (res) {
        // console.log(res)
         // 将数据存储起来
        if(url === '/manager/addEvalutePlan') {
          // console.log("添加用户信息")
          // console.log(res)
          _this.tableData.push(res.data)
        } else if(url === '/manager/editEvalutePlan') {
          // console.log("编辑用户信息")
          _this.tableData = res.data.data
        } else if(url === '/manager/delEvalutePlan') {
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
              that.sendRequest('/manager/editEvalutePlan',opt)
            }else {
              // 新增
              if (that.tableData.length > 0) {
              	alert('已有教学评测信息，请在此条信息上修改，不要重复添加')
              	that.dialogFormVisible = false
              	return
              }
              that.sendRequest('/manager/addEvalutePlan',that.form)
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
      this.$http.get('/manager/evalutePlanAll').then(function (res) {
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
      this.form.stuNum = selfData.stuNum
      this.form.name = selfData.name
      this.form.sex = selfData.sex
      this.form.age = selfData.age
      this.form.moblie = selfData.moblie
      this.form.className = selfData.className
      // this.form.address = selfData.address

      // this.$http.post('/api/editStudent', {_id: id}).then(function (res) {
      //  console.log(res)
      // })
    },

    openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true
    },

    delData() {
      this.sendRequest('/manager/delEvalutePlan',{id: this.delId})
      this.dialogVisible=false
      this.getAllData()
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

  
};
</script>

