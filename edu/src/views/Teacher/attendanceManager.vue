<!-- 教师考勤管理 -->
<template>
  <div>
	<el-row>
	    	<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
	      <div class="searchbox" style="display: inline-block; float: right;">
	        <input class="sc" type="text" placeholder="请输入日期" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
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
	        label="班级名">
	      </el-table-column>
	      <el-table-column
	        prop="stuNumberAll"
	        label="学生总数">
	      </el-table-column>
	      </el-table-column>
	      <el-table-column
	        prop="beNumber"
	        label="已到人数">
	      </el-table-column>
	      <el-table-column
	        prop="notNumber"
	        label="未到人数">
	      </el-table-column>
	      <el-table-column
	        prop="notStu"
	        label="未到学员名单">
	      </el-table-column>
	      <el-table-column
	        prop="remark"
	        label="备注">
	      </el-table-column>
	      <el-table-column
	        prop="time"
	        label="操作时间">
	      </el-table-column>
	      <el-table-column
	        prop="teacherName"
	        label="操作教师">
	      </el-table-column>
	      
	    </el-table>
	  

		<el-dialog title="请填写教务考勤表" :visible.sync="dialogFormVisible" style="height: 100%">
	      <el-form :model="form" :rules="rules" ref="form">
	      	<el-form-item label="班级名" prop="className">
	          <el-input v-model="form.className" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="学员总数" prop="stuNumberAll">
	          <el-input v-model="form.stuNumberAll" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="已到人数" prop="beNumber">
	          <el-input v-model="form.beNumber" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="未到人数" prop="notNumber">
	          <el-input v-model="form.notNumber" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="未到学员名单" prop="notStu">
	          <el-input v-model="form.notStu" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="备注" prop="remark">
	          <el-input v-model="form.remark" autocomplete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="操作时间" prop="time">
	        	<el-date-picker
			      v-model="form.time"
			      type="datetime"
			      placeholder="选择日期时间"
			      value-format="yyyy-MM-dd HH:mm"
				  style='width: 80%'
			      >
			    </el-date-picker>
	         <!--  <el-input v-model="form.date" autocomplete="off"></el-input> -->
	        </el-form-item>
			<el-form-item label="操作教师" prop="teacherName">
	          <el-input v-model="form.teacherName" autocomplete="off"></el-input>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisible = false">取 消</el-button>
	        <el-button type="primary" @click="submitFrom">确 定</el-button>
	      </div>
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
      	className: "",
      	stuNumberAll: null,
      	beNumber: null,
        notNumber: null,
        notStu: '',
        remark: '',
        date: '',
        teacherName: ''
      },
      rules: {
        
      }
    }
  },
	methods: {
    submitFrom() {
      const that = this
      this.$refs['form'].validate((valid) => {
       
        if (valid) {
          if(that.isEdit) {
            let opt = that.form
            opt._id = that.editId
            // 修改
              that.sendRequest('/teacher/editAttendance',opt)
            }else {
              // 新增
              that.$http.post('/teacher/addAttendance', {form: this.form})
                  .then(function(res) {
                    console.log(res)
                    that.tableData1=res.data
                  })
                  .catch(function(error) {
                    console.log(error)
                  })
              }  
          that.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });     
    },
    // 获取所有的班级课表
    getAllData() {
      var _this = this
       this.$http.post('/teacher/findMsg', {teacherName: JSON.parse(window.localStorage.teaInfo).username}).then(function(res) {
          console.log(res)
          _this.$http.post('/teacher/allAttendance', {className: res.data.className}).then(function(res) {
            console.log(res)
            _this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
      })
    },
    searchData() {
      var _this = this
      console.log(_this.tableData)
      var result = _this.tableData.filter(function(value, index, arr) {
        // console.log(value)
        // console.log(document.getElementsByClassName('sc')[0].value)
        return document.getElementsByClassName('sc')[0].value == value.time
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

  
};
</script>
