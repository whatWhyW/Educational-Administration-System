<template>
	<div>
		<el-row>
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
			</el-table>
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
      tableData: [],
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
  mounted: function() {
    // 组件创建时候去获取所有的用户数据
    this.getAllData();
  }
}
</script>