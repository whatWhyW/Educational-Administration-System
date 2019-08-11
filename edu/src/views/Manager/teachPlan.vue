<template>
	<div>
		<!-- <span class='font'>欢迎进入本校教学计划模块</span>
		<p class='text'>Hai，您可以在这里设置教学总体计划，祝您工作愉快</p> -->
		<div>
			<el-tabs type="border-card">
			  <el-tab-pane>
			    <span slot="label"><i class="el-icon-date"></i> 现行计划</span>
			    <div style="width: 1600px">
			    	<div class='box'>
				    	<h3><span class="el-icon-s-promotion"></span> 初级课程</h3>
						<h5>前端切图仔（静态网页制作、JS编程入门、大量页面特效制作）</h5>
						<p>初级课程主要学习最基本的网页制作技术。你将学会制作漂亮的网页、各式各样的页面效果。初级课程共16个教学日。</p>
						<img src="" alt="">
					</div>
					<div class='box'>
						<h3><span class="el-icon-s-tools"></span> 进阶课程</h3>
						<h5>前端小能手（深入JS内功修炼、超级炫酷的HTML5和CSS3、Ajax和手机游戏）</h5>
						<p>进阶课程将使你的JavaScript编程能力大大提升！我们将学习制作能够和后台交互数据的Ajax页面、非常炫酷的CSS3页面！更将学习手机端的响 应式页面制作。本部分共30个教学日。</p>
						<img src="" alt="">
					</div>
					<div class='box'>
						<h3><span class="el-icon-s-shop"></span> 中级课程</h3>
						<h5>前端小能手（深入后台数据、打通前后端、让全栈不是梦）</h5>
						<p>中级课程将使你的编程思维编程能力大大提升！我们将学习制作能够和后台交互数据的Ajax页面、后端数据库、数据持久化，让学生拥有独立全栈开发的能力。本部分共30个教学日。</p>
						<img src="" alt="">
					</div>
					<div class='box'>
						<h3><span class="el-icon-star-on"></span> 高级课程</h3>
						<h5>高级架构狮（各种高端技术放马过来！时下最新兴、面试最加分的高级技术应有尽有！）</h5>
						<p>通往前端大神之路，就在高级课程阶段。我们将学习全栈技术，『上天入地』！上天，我们要做服务器端开发；入地，我们要做手机端开发。还将综合利用所学，结合时下流行的MVC框架，制作综合项目！本部分共30教学日。</p>
						<img src="" alt="">
					</div>
					<div class='box'>
						<h3><span class="el-icon-s-custom"></span> 就业课程</h3>
						<h5>专业程序员（各种面试放马过来！技术在手工作我选！）</h5>
						<p>高薪不靠996, 通往前端就业之路就在就业课程。我们将用"火眼金睛"在就业信息中寻找最有价值的信息，寻找最适合自己的高薪！本部分共10教学日。</p>
						<img src="" alt="">
					</div>
			    </div>
			  </el-tab-pane>
			  <el-tab-pane label="计划文件">
				<div style="width: 1600px">
					<p>此处，您可以选择将教学计划文件上传到服务器，上传到服务器下的upload文件夹下，以方便管理</p>
					<el-button type="success" plain @click="file()" style="margin-bottom: 20px">点击开始进行文件上传</el-button>
					<router-view></router-view>
				</div>
			  </el-tab-pane>
			</el-tabs>
			
			<h4></h4>
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
	
	.el-main {
		height: 100%;
		overflow: hidden;
		.el-tabs {
		height: 100%;
		overflow: hidden;
		}
		.el-tabs__header {
			height: 15%;
		}
		.el-tabs__content {
			height: 80%;
			.box {
				height: 130px;
				h3 {
					font-size: 20px;
					height: 34px;
					line-height: 34x;
					font-weight: 600;
					margin: 0;
					margin-top: 20px;
				}
				h5 {
					font-size: 16px;
					height: 28px;
					line-height: 28px;
					font-weight: 600;
					margin: 0;
					margin-bottom: 6px;
					text-indent: 2em;
				}
				p {
					font-size: 14px;
					height:22px;
					line-height: 22px;
					margin: 0px;
					text-indent: 2em;
				}
				&:first-child {
					background-color: #B5E6FF;
				}
				&:nth-child(2) {
					background-color: #C8E2FB;
				}
				&:nth-child(3) {
					background-color: #C0F3FE;
				}
				&:nth-child(4) {
					background-color: #A7D6E8;
				}
				&:nth-child(5) {
					background-color: #C8ECFE;
				}
			}
		}
		
	}
	
	
</style>

<script>
export default {
	methods: {
		file() {
			console.log('执行了')
			this.$router.push({path:'/manager/teachPlan/fileUplode'})
		}
	}
}
</script>