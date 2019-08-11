<template>
	<div>
		<!-- <div style="height: 90px">
			<span class='font'>欢迎进入本校考试试题库管理模块</span>
			<p class="text">以下是经典考试题及推荐试题网站，以方便整体出最适合学生的考试试题</p>
		</div> -->

		<el-tabs type="border-card">
		  <el-tab-pane>
		    <span slot="label"><i class="el-icon-date"></i> 考试题简介</span>
		   <div>
		   	  <el-collapse v-model="activeNames" @change="handleChange">
					  <el-collapse-item title="笔试题" name="1">
					    <div>笔试(Written Test)是一种与面试对应的测试，是以填写的方法考核应聘者学识水平的重要工具。这种方法可以有效的测量应聘人的基本知识、专业知识、管理知识、综合分析能力的差异。</div>
					    <div>前端常见笔试形式主要有五种：多种选择题、是非题、匹配题、填空题、简答题。通过这些题去检测基础性和细节性内容。</div>
					    <div>
					    	技术性笔试这类笔试主要针对研发型和技术类职位的应聘，这类职位的特点是，对于相关专业知识的掌握要求比较高，题目特点是主要关于涉及工作需要的技术性问题，专业性比较强。
					    </div>
					    <div>
					    	这类考试的结果，和同学们的学习成绩密不可分。所以，要成功应对这类的考试，需要坚实的专业基础。特别是针对于前端技术性笔试题，更要做好充足的准备以应对考试。
					    </div>
					    <div>重点：如果笔试无法通过，那么就不会有面试机会和入职机会！！！</div>
					  </el-collapse-item>
					  <el-collapse-item title="面试题" name="2">
					    <div>面试(One to One Test)是一种与笔试对应的测试，是以一对一问答的方法考核应聘者学识水平的重要工具。这种方法可以有效的测量应聘人对技术性内容的掌握程度及经验水平。</div>
					    <div>面试题相对灵活，但大多数都是围绕着应聘岗位的技术性、疑难点、常出错的技术点等内容的问答</div>
					    <div>
					    	技术性面试这类主要针对研发型和技术类职位的应聘，这类职位的特点是，对于相关专业知识的掌握要求比较高，题目特点是主要关于涉及工作需要的技术性问题，专业性比较强。如果公司必要，面试可能会经过三轮左右。
					    </div>
					    <div>
					    	这类面试的结果，和同学们的经验密不可分。所以，要成功应对这类的考试，需要坚实的专业基础、丰富的经验和灵活应变的思维能力。因此，针对于前端技术性面试，万不可忽视。
					    </div>
					    <div>重点：面试是通往工作岗位的阶梯，务必要予以关注！！！</div>
					  </el-collapse-item>
					  <el-collapse-item title="offer谈" name="3">
					    <div>offer谈是一种与人力资源的谈话，这类谈话比较轻松，也比较严肃，重点是谈工作后的福利待遇问题</div>
					    <div>前端常见笔试形式主要有五种：多种选择题、是非题、匹配题、填空题、简答题。通过这些题去检测基础性和细节性内容。</div>
					    <div>
					    	在此环节中，要巧妙运用谈话技巧，适当的谈话能够让你的工资上涨20%左右哦！
					    </div>
					    <div>重点：为了争取更好的待遇，一定要注意此部分的技巧哦！！！</div>
					  </el-collapse-item>
				  </el-collapse>
		   </div>
		  </el-tab-pane>
		  <!-- <el-tab-pane label="经典笔试题知识点">
				<h4>基础知识内容</h4>
				<p>对Web标准的理解、浏览器内核差异、兼容性、hack、CSS基本功：布局、盒子模型、选择器优先级及使用、HTML5、CSS3、移动端适应。</p>
				<h4>JavaScript</h4>
				<p>数据类型、面向对象、继承、闭包、插件、作用域、跨域、原型链、模块化、自定义事件、内存泄漏、事件机制、异步装载回调、模板引擎、Nodejs、JSON、ajax等。</p>
				<h4>其他</h4>
				<p>HTTP、安全、正则、优化、重构、响应式、移动端、团队协作、可维护、SEO、UED、架构、职业生涯</p> 
			</el-tab-pane>
		  <el-tab-pane label="经典笔试题知识点">
		  	<h4>HTML&CSS</h4>
				<p> 对Web标准的理解、浏览器内核差异、兼容性、hack、CSS基本功：布局、盒子模型、选择器优先级及使用、HTML5、CSS3、移动端适应</p>
				<h4>JavaScript</h4>
				<p>数据类型、面向对象、继承、闭包、插件、作用域、跨域、原型链、模块化、自定义事件、内存泄漏、事件机制、异步装载回调、模板引擎、Nodejs、JSON、ajax等。</p>
				<h4>其他</h4>
				<p>HTTP、安全、正则、优化、重构、响应式、移动端、团队协作、可维护、SEO、UED、架构、职业生涯</p> 
			</el-tab-pane>
			<el-tab-pane label="offer谈">
		  	<p>个人求职意向相关，包括薪资问题等等</p>
				<p>你为什么要转向前端开发，你对前端语言和其他语言差异有什么看法</p>
				<p>你对前端的迭代很快有什么看法，你一般是怎么适应前端的发展速度的(可谓是很专业的hr了)</p>
		  	<p>个人性格相关</p>
				<p>...</p>
			</el-tab-pane> -->
		  <el-tab-pane label="推荐题库网站">
		  	<a href="http://www.csdn.net/">CSDN社区</a>
		  	<a href="https://segmentfault.com/">IT技术问答网站</a>
		  	<a href="http://www.cnblogs.com/">创意人员和程序员社区</a>
		  	<a href="http://www.infoq.com/cn/InfoQ/">面向开发者的知识分享社区</a>
		  	<a href="http://www.geeksforgeeks.org/">海量编程题</a>
		  	<a href="http://codeforces.com/">面试题在线训练</a>
		  	<a href="">顶级开发程序员练习网站</a>
		  	<a href="https://www.codecademy.com/">每周都有奖金的编码竞赛</a>
		  	<a href="https://codehs.com/">数据接口、游戏设计等面试题</a>
		  	<a href="https://projecteuler.net/">590道题测水平</a>
		  	<a href="http://exercism.io/">前端代码练习1</a>
		  	<a href="https://www.codingame.com">前端代码练习2</a>
		  	<a href="https://segmentfault.com/a/1190000018225708?utm_source=tag-newest">vue试题汇总</a>
		  	<a href="https://www.cnblogs.com/haoyijing/p/5789348.html">----热心博主整理</a>
		  	<a href="https://www.jianshu.com/p/2f7eb1ad7174">----热心简书作者整理</a>
		  	<a href="http://www.cnblogs.com/sb19871023/p/3894452.html">前端知识体系</a>
				<a href="https://github.com/JacksonTian/fks">前端知识结构</a>
				<a href="https://github.com/unruledboy/WebFrontEndStack">前端开发大系概述</a>
				<a href="http://www.cnblogs.com/unruledboy/p/WebFrontEndStack.html">Web前端开发大系概览-中文版	</a>
				<a href="https://github.com/nieweidong/fetool">大前端工具集</a>
				<a href="https://dwqs.gitbooks.io/frontenddevhandbook/content">前端开发者手册	</a>
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
.clist {
	list-style-type: none;
}
a {
	display: block;
	text-indent: 2em;
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	color: #000;
	text-decoration: none;
}
a:hover {
	color: blue;
	text-decoration: underline;
}
</style>
export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(!val) {
        console.log(!val);
      }
    }
}
</script>