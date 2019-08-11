<template>
	<div>
		<div>
			<div style='height: 80px'> 
          <h2 class='font' style="text-align: center;">欢迎您进入该教务管理系统, 祝您使用愉快</h2>
      </div>
		   	
		</div>
		 	<div class='left'>
		 		<p>请相信：我消灭你，与你无关</p>
		 		<p>在这个时代，除了不断学习，没有他选</p>
		 		<p>为的是什么？高薪？体面？攀比？跟风？潮流？</p>
		 		<p>幸福、有安全感的生活，通过学习去争取是最快的捷径</p>
		 		<img src="../../../public/img/start1.jpg" alt="">
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
	  	width: 90%;
	  	float: left;
	  	margin-right: 20px;
	  }
  }
  
  .el-calendar {
  	float: right;
  	width: 45%;
  	height: 80%;
  	margin-top: 55px;
    color: red;
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
</script>