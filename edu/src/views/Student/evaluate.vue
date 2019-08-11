<template>
	<div class="block">
	  <div class='comment' id='evaluatable'>
	  	<el-row>
	  		<span class='title'>老师是否迟到</span>
	  		<el-radio-group v-model="value1">
			    <el-radio :label="5">A</el-radio>
			    <el-radio :label="4">B</el-radio>
			    <el-radio :label="3">C</el-radio>
			    <el-radio :label="2">D</el-radio>
			    <el-radio :label="1">E</el-radio>
			</el-radio-group>
	  	</el-row>
	  	<el-row>
	  		<span class='title'>老师是否上课玩手机</span>
	  		<el-radio-group v-model="value2">
	  			<el-radio :label="5">A</el-radio>
				<el-radio :label="4">B</el-radio>
				<el-radio :label="3">C</el-radio>
				<el-radio :label="2">D</el-radio>
				<el-radio :label="1">E</el-radio>
			</el-radio-group>
	  	</el-row>
			<el-row>
		  		<span class='title'>上课问题老师能不能帮解决</span>
		  		<el-radio-group v-model="value3">
				    <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>老师专业素质</span>
		  		<el-radio-group v-model="value4">
				   <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>老师讲课态度</span>
		  		<el-radio-group v-model="value5">
				    <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>老师备课是否充分</span>
		  		<el-radio-group v-model="value6">
				   <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>课程难以程度</span>
		  		<el-radio-group v-model="value7">
				    <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  		<el-row>
		  		<span class='title'>学习吸收率</span>
		  		<el-radio-group v-model="value8">
				    <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>课堂趣味性</span>
		  		<el-radio-group v-model="value9">
				   <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
		  	<el-row>
		  		<span class='title'>继续学习兴趣</span>
		  		<el-radio-group v-model="value10">
				    <el-radio :label="5">A</el-radio>
					<el-radio :label="4">B</el-radio>
					<el-radio :label="3">C</el-radio>
					<el-radio :label="2">D</el-radio>
					<el-radio :label="1">E</el-radio>
				</el-radio-group>
		  	</el-row>
			<el-row>
				<span class='title'>对老师的建议</span>
				<textarea name="" id="" cols="80" rows="3" v-model="value11"></textarea>
			</el-row>	
			<el-row>
				<span class='title'>对学校的建议</span>
				<textarea name="" id="" cols="80" rows="3" v-model="value12"></textarea>
			</el-row>
			<el-row>
				<el-button type='danger' @click='submit'>提交</el-button>
				<el-button type='primary' @click='clear'>重置</el-button>
			</el-row>	
	  </div>
	  <div class="textBox" id='textBox'>
	  	<p>Sorry, 现在教学管理者未开通教学评测窗口, 请等待该窗口开放时再进行教学考评时再操作</p>
	  	<router-link to="/student/start" style='display: block;'>--------------返回首页-----------</router-link>
	  	<img src="../../../public/img/start1.jpg" alt="" style="width: 100%; margin-top: 50px;">
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
.comment {
	display: none;
}
.textBox {
	display: none;
	font-size: 22px;
	line-height: 40px;
	color: transparent;
	background-color: blue;
	text-shadow : rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px;
	-webkit-background-clip : text;
}
.block {
	width: 800px;
	margin: 0 auto;
	.el-row {
		height: 55px;
	}
	.el-row:nth-child(12), .el-row:nth-child(11){
		margin-top: 0px;
		height: 105px;
	}
	.title {
		width: 35%;
		display: inline-block;
		height: 55px;
		line-height: 55px;
	}
	textarea {
		margin-top: -12px;
	}
	.el-button {
		position: relative;
		top: 20px;
	}
}



</style>
<script>
  export default {
    data() {
      return {
      	table: {},
      	value1:  '',
      	value2:  '',
      	value3:  '',
      	value4:  '',
      	value5:  '',
      	value6:  '',
      	value7:  '',
      	value8:  '',
      	value9:  '',
      	value10: '',
      	value11: '',
      	value12: '',
   
      
      }
    },
    methods: {
    	submit() {
    		var _this = this;
    		this.table = {
  			value1: this.value1,
  			value2: this.value2,
  			value3: this.value3,
  			value4: this.value4,
  			value5: this.value5,
  			value6: this.value6,
				value7: this.value7,
				value8: this.value8,
				value9: this.value9,
				value10: this.value10,
				value11: this.value11,
				value12: this.value12
    		}
    		// console.log(this.table)

    		// console.log(this.value1,this.value2,this.value3,this.value4,this.value5,this.value6,
    		// 		this.value7,this.value8,this.value9,this.value10,this.value11,this.value12
    		// )
    		this.$http.post('/student/evaluate', {table: this.table} )
    		 .then(function(res) {
    		 		console.log(res)
    		 		alert('提交成功， 请勿反复操作');
    		 		_this.clear()
    		 })
    		 .catch(function(err) {
    		 	console.log(err)
    		 }) 
    	},
    	clear() {
    		this.value0 = '',
	      	this.value1 = '',
	      	this.value2 = '',
	      	this.value3 = '',
	      	this.value4 = '',
	      	this.value5 = '',
	      	this.value6 = '',
	      	this.value7 = '',
	      	this.value8 = '',
	      	this.value9 = '',
	      	this.value10 = '',
	      	this.value11 = '',
	      	this.value12 = ''
   
    	},
    	getEvaluateData() {
		      var _this = this
		      this.$http.post('/student/findMsg', {studentName: JSON.parse(window.localStorage.stuInfo).username}).then(function(res) {
		          // console.log(res)
		          _this.$http.post('/student/evaluateAll', {className: res.data.className}).then(function(res) {
		          	 // console.log(res)
		          	var isEvaluate = document.getElementById("evaluatable");
		          	var textBox = document.getElementById('textBox');
			          // if (res.data[0].proceed === '是') {
			          // 	console.log('可以考勤')
			          // 	console.log(isEvaluate.style.display = block)
			          // }
			          	// console.log(res)
			          	// console.log(res.data.length)
		          	if (res.data.length == 0) {
		          		 textBox.style.display = 'block';
		          		 return
		          	}
		          	res.data[0].proceed === '是' ? isEvaluate.style.display = 'block' : textBox.style.display = 'block';
	          	
		        })
		        .catch(function(error) {
		          console.log(error)
		        })
        })
        .catch(function(error) {
          console.log(error)
        })
    	}
    },
    mounted() {
    	this.getEvaluateData();
    }
  }
</script>