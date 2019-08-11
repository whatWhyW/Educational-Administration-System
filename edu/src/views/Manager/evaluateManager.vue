<template>
  <div>
   	<el-button type="danger" plain @click="getEvalute()">刷新</el-button>
    <el-table
	      :data="tableData"
	      stripe
	      style="width: 100%">
	   		<el-table-column
	   			width=60
	        prop="value1"
	        label="是否迟到">
	      </el-table-column>
	      <el-table-column
	      	width=78
	        prop="value2"
	        label="是否课上玩手机">
	      </el-table-column>
	      <el-table-column
	        width=78
	        prop="value3"
	        label="是否能解决问题">
	      </el-table-column>
	      <el-table-column
	        width=60
	        prop="value4"
	        label="专业素质">
	      </el-table-column>
	      <el-table-column
	      	width=60
	        prop="value5"
	        label="讲课态度">
	      </el-table-column>
	      <el-table-column
	      	width=70
	        prop="value6"
	        label="备课充分度">
	      </el-table-column>
	      <el-table-column
	      	width=70
	        prop="value7"
	        label="课堂难易度">
	      </el-table-column>
	      <el-table-column
	      	width=70
	        prop="value8"
	        label="学习吸收率">
	      </el-table-column>
	      <el-table-column
	      	width=70
	        prop="value9"
	        label="课堂趣味性">
	      </el-table-column>
	      <el-table-column
	      	width=70
	        prop="value10"
	        label="继续学兴趣">
	      </el-table-column>
	      <el-table-column
	      	
	        prop="value11"
	        label="对老师建议">
	      </el-table-column>
	      <el-table-column

	        prop="value12"
	        label='对学校建议'>
	      </el-table-column>
	       <el-table-column
	        label="操作">
	        <template slot-scope="scope">
	          <el-button type="danger" @click="openDialog(scope.$index)">删除</el-button>
	        </template>
	      </el-table-column>
    </el-table>
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
</style>
<script>
export default {
	name: "index",
	data() {
		return {
			dialogVisible:false,
			delId: '',
			tableData: [],
		}
	},
	methods: {
		getEvalute() {
			var _this = this
			this.$http.get('/manager/evalute')
			.then(function (res) {
	        // console.log(res)
	        // console.log(res.data)
	        _this.tableData = res.data
	        console.log(_this.tableData)
	    })
      .catch(function (error) {
        console.log(error)
      })
		},
		openDialog(index) {
      this.delId = this.tableData[index]._id
      this.dialogVisible = true

    },

    delData() {
    	var _this = this;
      this.$http.post('/manager/delEvaluate', {id: this.delId})
      	.then(function(res) { 
      		console.log(res)
      		_this.tableData = res.data.data
      	})
      	.catch(function(err) {
      		console.log(err)
      	})
      this.dialogVisible=false
      this.getEvalute()
    },
	},
	mounted() {
		this.getEvalute()
	}
}

</script>