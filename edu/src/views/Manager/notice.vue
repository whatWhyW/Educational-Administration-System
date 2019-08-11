<template>
	<div>
		<!-- <div style="height: 90px">
			<span class='font'>欢迎进入本校教学公告管理模块</span>
			<p class='text'>发布重要的公告去通知消息，有时比口头传递公告信息更有效哦</p>
		</div> -->
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="发布公告" name="first">
					<div class='title' style="">
						<el-input
						style='width: 25%; margin-right: 70px'
						autosize
						placeholder="请输入标题"
						v-model="title">
					</el-input>
					<el-date-picker class='time'
					type="datetime"
					placeholder="选择日期时间"
					value-format="yyyy-MM-dd HH:mm"
					style='width: 25%'
					v-model="time"
					>
				</el-date-picker>
				 <!--   <el-input
					  style='width: 30%; margin-right: 10px'
					  autosize
					  placeholder="请输入面向群体"
					  v-model="cata">
					</el-input> -->
					<el-select style='width: 25%; margin-left: 70px' v-model="cata" placeholder="请选择面向群体" >
						<el-option label="学生" value="学生" autocomplete="off"></el-option>
						<el-option label="教师" value="教师" autocomplete="off"></el-option>
						<el-option label="全体" value="全体" autocomplete="off"></el-option>
					</el-select>
					<div style="position: relative; margin-top: 0px">
						<el-input class='val'
						type="textarea"
						:autosize="{ minRows: 20, maxRows: 22}"
						maxlength="1000"
						placeholder="请输入内容" 
						@input="descInput" 
						style='width: 90%; margin-top: 40px; margin-bottom: 30px;'
						v-model="val">
					</el-input>
					<span class="numberV" style="position: absolute; bottom: 40px; right: 180px; color: #aaa">{{txtVal}} /1000</span>		
				</div>
				<el-row>
					<el-button type="primary" @click='submit'>提交</el-button>
					<el-button type="info" @click='click'>重置</el-button>
				</el-row>

			</div>

		</el-tab-pane>
		<el-tab-pane label="公告管理" name="second">

			<el-button tyle="primary"  @click='getAll'>点击查看公告</el-button>
			<div class="searchbox" style="display: inline-block; float: right;">
				<input class="sc" type="text" placeholder="请输入标题或面向群体" style="width: 300px; margin-right: 20px; height: 32px; border-radius: 1px solid #302d1c; margin-bottom: -3px; position: relative; top: 3px;"/>
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
				<el-table-column label="操作" width="130">
					<template slot-scope="scope">
						<el-button type="danger" @click="delNotice(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
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
				activeName: 'first',
				title: '',
				time: '',
				val: '',
				cata: '',
				txtVal: null,
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
			descInput(){
				this.txtVal = this.val.length;
			},
			submit() {
				var _this = this
				console.log(this.cata)
		      	// console.log(this.title, this.time, this.val)
		      	this.$http.post('/manager/addNotice', {title: this.title, time: this.time, val: this.val, cata: this.cata})
		      	.then(function (res) {
		      		console.log('成功了')
		      		alert('提交成功！')
		      		_this.click()

		      	})

		      },
		      click() {
		      	this.val = '';
		      	this.title = '';
		      	this.time = '';
		      	this.cata = '';
		      },
		      getAll() {

		      	console.log('获取数据')
		      	var _this = this
		      	this.$http.get('/manager/allNotice')
		      	.then(function (res) {
		      		console.log('成功了')
		      		console.log(res)
		      		console.log(res.data)
		      		_this.tableData = res.data
		      		console.log(_this.tableData)
		      	})
		      	.catch(function (error) {
		      		console.log(error)
		      	})
		      },
		      delNotice(index) {
		      	var _this = this
		      	console.log(this.tableData[index]._id)
		      	this.$http.post('/manager/delNotice', {id: this.tableData[index]._id})
		      	.then(function (res) {
		      		_this.tableData = res.data.data
		      	})
		      },
		      searchData() {
		      	var _this = this
		      	console.log(_this.tableData)
		      	var result = _this.tableData.filter(function(value, index, arr) {
			        // console.log(value)
			        // console.log(document.getElementsByClassName('sc')[0].value)
			        return document.getElementsByClassName('sc')[0].value == value.title ||  document.getElementsByClassName('sc')[0].value == value.cata
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


      // add(){
      //   var _this=this;、
      //   console.log(this.diary.diary);
      //   // this.$reqs.post('/diarys/write',this.diary).then(res=>{
      //   //       console.log(res.data);
      //   //       _this.$router.push({path:'/manage'});
      //   // }).catch(err=>{console.log(err)})
      // }

  }
</script>
