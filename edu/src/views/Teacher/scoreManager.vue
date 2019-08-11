<!-- 教师只有增加成绩的权利 -->
<template>
    <div class="index">
      <el-tabs type="border-card">
      <el-tab-pane label="添加成绩">
        <el-row style="margin: 0 auto;">
          <el-button type="primary" @click="dialogFormVisible = true" style=''>新增</el-button>
          <div class="searchbox" style="display: inline-block; float: right;">
            <input class="sc" type="text" placeholder="请输入学生姓名或课程名或班级" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
            <el-button type="warning" plain @click="searchData">搜索</el-button>
            <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C'>成绩升序</el-button>
            <el-button type="warning" @click="sortDown()"  style='background-color: #FBF0EE; color: #E6A23C'>成绩降序</el-button>
            <el-button type="danger" plain @click="getAllData()">刷新</el-button>
          </div>
        </el-row>
        <el-table
          :data="tableData1"
          stripe
          style="width: 100%">
          <el-table-column
            prop="className"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名">
          </el-table-column>
          <el-table-column
            prop="score"
            label="成绩">
          </el-table-column>
          <el-table-column
            prop="time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="操作者">
          </el-table-column>
        </el-table>

        

        <el-dialog title="填写成绩表" :visible.sync="dialogFormVisible" style="height: 100%">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="班级" prop="className" autocomplete="off">
              <el-input v-model="form.className" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="studentName" autocomplete="off">
              <el-input v-model="form.studentName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="课程名" prop="courseName">
              <el-input v-model="form.courseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成绩" prop="score">
                <el-input v-model="form.score" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" prop="time">
                  <el-date-picker
                    v-model="form.time"
                    type="datetime"
                    placeholder="选择操作时间"
                    default-time="12:00:00"
                    style='width: 80%'
                    value-format="yyyy-MM-dd HH:mm"
                    >
                  </el-date-picker>
                  <!--  <el-input v-model="form.date" autocomplete="off"></el-input> -->
            </el-form-item>
            <el-form-item label="操作者" prop="teacherName">
              <el-input v-model="form.teacherName" autocomplete="off"></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitFrom">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>


      <el-tab-pane label="查看班级成绩">
        <el-row style="margin: 0 auto;">
          <el-button type="primary" @click="getAllData" style=''>点击查看班级成绩</el-button>
          <div class="searchbox" style="display: inline-block; float: right;">
            <input class="sc" type="text" placeholder="请输入学生姓名或课程名或班级" style="width: 400px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
            <el-button type="warning" plain @click="searchData">搜索</el-button>
            <el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C'>成绩升序</el-button>
            <el-button type="warning" @click="sortDown()"  style='background-color: #FBF0EE; color: #E6A23C'>成绩降序</el-button>
            <el-button type="danger" plain @click="getAllData">刷新</el-button>
          </div>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="className"
            label="班级">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名">
          </el-table-column>
          <el-table-column
            prop="score"
            label="成绩">
          </el-table-column>
          <el-table-column
            prop="time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="操作者">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
  .el-dialog__body {
    padding: 10px 20px;
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
      tableData1: [],
      dialogFormVisible: false,
      isEdit: false, //是否修改
      editId: '',
      delId: '',
      form: {
        studentName: '',
        teacherName: '',
        courseName: "",
        className: '',
        score: null,
        time: '',
      },
      rules: {
        // score: [
        //   { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
        // ],
        teacherName: [
          { require: true,  message: '必须填写您的姓名', trigger: 'blur'}
        ]
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
              that.sendRequest('/teacher/editScore',opt)
            }else {
              // 新增
              that.$http.post('/teacher/addScore', {form: this.form})
                  .then(function(res) {
                    console.log(res)
                    that.tableData1.push(res.data)
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
          _this.$http.post('/teacher/scoreAll', {className: res.data.className}).then(function(res) {
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
        return document.getElementsByClassName('sc')[0].value == value.courseName || document.getElementsByClassName('sc')[0].value == value.studentName
      })
      // console.log(result)
      _this.tableData = result
    },
     sortUp() {
      var objectArraySort = function(keyName) {
        return function(objectN, objectM) {
          var valueN = objectN[keyName]
          var valueM = objectM[keyName]
          if (valueN > valueM) return 1
          else if (valueN < valueM) return -1
          else return 0
        }
      }
      this.tableData.sort(objectArraySort('score'))
    },
    sortDown() {
      var objectArraySort = function(keyName) {
        return function(objectN, objectM) {
          var valueN = objectN[keyName]
          var valueM = objectM[keyName]
          if (valueN < valueM) return 1
          else if (valueN > valueM) return -1
          else return 0
        }
      }
      this.tableData.sort(objectArraySort('score'))
    },
  },
  watch: {
    dialogFormVisible() {
      if(!this.dialogFormVisible) this.isEdit=false
    }
  },
  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    // this.getAllData();
  }
};
</script>

