<template>
	<div>
		<!-- <div style="height: 90px">
			<span class='font'>欢迎进入本校教学公告管理模块</span>
			<p class='text'>发布重要的公告去通知消息，有时比口头传递公告信息更有效哦</p>
		</div> -->
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全体公告" name="first">

					<el-button tyle="primary"  @click='getAll'>点击查看公告</el-button>
					<div class="searchbox" style="display: inline-block; float: right;">
						<input class="sc" type="text" placeholder="请输入标题" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
						<el-button type="warning" plain @click="searchData">搜索</el-button>
						<el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C' >时间升序</el-button>
						<el-button type="warning" @click="sortDown()" style='background-color: #FBF0EE; color: #E6A23C' >时间降序</el-button>
						<el-button type="danger" plain @click="getAll()">刷新</el-button>
					</div>
					<el-table title="" name="1" :data="tableData" stripe>
						<el-table-column v-model='title' label='标题' prop="title" width="130"></el-table-column>
						<el-table-column v-model='time' label='时间' prop="time" width="120"></el-table-column>
						<el-table-column v-model='time' label='面向群体' prop="cata" width="120"></el-table-column>
						<el-table-column v-model='val' label='内容' prop="val"></el-table-column>
					</el-table>
				</el-tab-pane>    


				<el-tab-pane label="教师公告" name="third">
					<el-button tyle="primary"  @click='getAllT'>点击查看公告</el-button>
					<div class="searchbox" style="display: inline-block; float: right;">
						<input class="sc" type="text" placeholder="请输入标题" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
						<el-button type="warning" plain @click="searchData">搜索</el-button>
						<el-button type="warning" @click="sortUp()" style='background-color: #FBF0EE; color: #E6A23C' >时间升序</el-button>
						<el-button type="warning" @click="sortDown()" style='background-color: #FBF0EE; color: #E6A23C' >时间降序</el-button>
						<el-button type="danger" plain @click="getAll()">刷新</el-button>
					</div>
					<el-table title="" name="1" :data="tableData1" stripe>
						<el-table-column v-model='title' label='标题' prop="title" width="130"></el-table-column>
						<el-table-column v-model='time' label='时间' prop="time" width="120"></el-table-column>
						<el-table-column v-model='time' label='面向群体' prop="cata" width="120"></el-table-column>
						<el-table-column v-model='val' label='内容' prop="val"></el-table-column>
					</el-table>
				</el-tab-pane>    
	</el-tabs>
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
	import { quillEditor } from "vue-quill-editor";

	import 'quill/dist/quill.js';

	export default{
		name: "index",
		data(){
			return{
				delId: '',
				tableData: [],
				tableData1: [],
				activeName: 'first',
				title: '',
				time: '',
				val: '',
				cata: '',
				texVal: null,
				activeNames: ['1']
			}
		},
		methods:{
			handleChange(val) {
				console.log(val);
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			descInput() {
				console.log('执行了');
				this.txtVal = this.val.length;
			},
			
      getAll() {
      	var _this = this
      	this.$http.post('/teacher/noticeAll', {cata: '全体'})
      	.then(function (res) {
      		_this.tableData = res.data
      	})
      	.catch(function (error) {
      		console.log(error)
      	})
      },
      getAllT() {
      	var _this = this
      	this.$http.post('/teacher/noticeAll', {cata: '教师'})
      	.then(function (res) {
      		_this.tableData1 = res.data
      	})
      	.catch(function (error) {
      		console.log(error)
      	})
      },
      searchData() {
      	var _this = this
      	console.log(_this.tableData)
      	var result = _this.tableData.filter(function(value, index, arr) {
	       
	        return document.getElementsByClassName('sc')[0].value == value.title 
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
    	}


	    }
	  </script>
