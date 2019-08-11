<template>
	<div>
		<div>
			<div style='height: 80px'> 
		      <h2 class='font' style="text-align: center;">欢迎进入您进入该教务管理系统, 祝您使用愉快</h2>
		  </div>
		   	
		</div>
		 	<div class='left'>
		 		<p>培养企业需要的技术人员是存在之本</p>
		 		<p>享受工作，专注做事，才能更高效率</p>
		 		<p>技术不断革新的时段，万不可丝毫松懈</p>
		 		<p>努力工作的人才会跟进时代的不符</p>
		 		<img src="../../../public/img/start5.jpg" alt="">
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
    float: left;
  }
  .left {
  	margin-top: 42px;
  	width: 45%;
  	float: left;
  	p {
  		height: 18px;
  		line-height: 18px;
  		text-indent: 2em;
      font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
      font-size:18x; 
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
  	margin-top: 36px;
    color: blue;
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