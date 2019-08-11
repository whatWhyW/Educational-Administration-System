<template>
	<div>
		<div>
			<div style='height: 80px'> 
          <h2 class='font' style="text-align: center;">欢迎您进入该教务管理系统, 祝您使用愉快</h2>
      </div>
		   	
		</div>
		 	<div class='left'>
		 		<p>教师曾是我们最崇拜的人，现在，我们也成立这样的人</p>
		 		<p>世上确有两全法，不负职业所托，不负学子所盼</p>
		 		<p>终身学习的时代，唯有走在最前面，才能够打造更好的教育</p>
		 		<p>即为之，则安之，与学生共同成长，与学校共担荣辱</p>
		 		<img src="../../../public/img/start.jpg" alt="">
		 	</div>
			<el-calendar v-model="value">
			</el-calendar>	
			
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
  .left {
  	margin-top: 42px;
  	width: 45%;
  	float: left;
  	p {
  		height: 20px;
  		line-height: 20px;
  		text-indent: 2em;
      font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
      font-size:18px; 
      color:#999999;
      
  	}
  	img {
	  	width: 103%;
	  	float: left;
	  	margin-right: 20px;
	  }
  }
  
  .el-calendar {
  	float: right;
  	width: 45%;
  	height: 80%;
  	margin-top: 40px;
    color: orange;
  }

</style>
<script>
  export default {
    data() {
      return {
        value: new Date(),
      //   imgList: [
	     //    {id:0, src:'../../../public/img/start3.jpg'}, 
	     //    {id:1, src:'../../../public/img/start4.jpg'}, 
	     //    {id:2, src:'../../../public/img/start.jpg'}, 
	     //    {id:3, src:'../../../public/img/start5.jpg'}
	     // ]
      }
    }
  }
</script>30