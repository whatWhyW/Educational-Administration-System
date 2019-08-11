<template>
    <div>
        <el-container>
            <el-header style="">
              <span class='mySystem' style='
              font-size: 30px; 
              font-weight: bold; 
              float: left;
              '>教务管理系统毕业设计</span>
              <a @click="loginout" style='float: right; text-decoration: none; color: #552299'>安全退出</a>
              <span style='float: right;margin-right: 15px'>欢迎 <i>{{username}}</i> 使用</span>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width='260px' height='100%' style="background-color: #B3C0D1">
                <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group> -->
                <el-menu :default-active="this.$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="background-color: #B3C0D1">
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in stList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                     <el-submenu index="0">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">账户信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in grList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学教务管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in jwList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学课表管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in kcList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学校班级管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in bjList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学生信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in xsxxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学生考试管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in kpList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="11">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学生成绩管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in cjList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学生考勤管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in kqList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!-- <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">学生就业管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in jyList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->
                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教师信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in jsxxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="9">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教师测评管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in cpList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="10">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">校园公告管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in ggList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
        
    </div>
</template>


<style lang='scss'>
  @import "../static/css/base.scss";
  .mySystem {
    @include fontOne;
  }
  body, html{
    height: 100%;
    .el-container:nth-child(1) {
    }
    .el-container:nth-child(2) {
        height: 875px;
      .el-aside  {  
        li {
            .el-menu-item-group {
                background-color: #CADEE2;
            }
        }
      }   
    }
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .title {
    font-size: 20px;
  }
 .el-submenu__title {
    font-size: 20px;
  }
  .el-menu-item-group__title {
    font-size: 18px;
  }
  
</style>

<script>
  export default {
    data() {
        
        return {
            username: '',
            isCollapse: false, 
            xsxxList: [
                {name:'/manager/studentMsgMange',navItem:'学生信息管理'},
            ],
            jsxxList: [
                {name:'/manager/teacherMsgManage', navItem:'教师信息管理'},
            ],
            bjList: [
                {name:'/manager/classPlan',navItem:'教学班级安排'},
                {name:'/manager/classMsgManager',navItem:'班级信息管理'}
            ],
            xxList: [
                {name:'',navItem:'教师管理'},
                {name:'',navItem:'教师教学管理'},
                {name:'',navItem:'班级管理'},
                {name:'',navItem:'班级信息管理'},
                {name:'',navItem:'班级学员管理'},
                {name:'',navItem:'学员管理'},  
                {name:'',navItem:'学生学费管理'}, 
            ],
            jwList: [
                // {name:'/manager/teachPlan',navItem:'教学总体计划'},
                // {name:'/manager/teachTask',navItem:'教学任务分配'}
                 {name:'/manager/coursePlan',navItem:'教学课程计划'},
                {name:'/manager/teachTask',navItem:'教学任务分配'}
            ],
            kcList: [     
                {name:'/manager/courseSchedule',navItem:'教学课程表'},
                {name:'/manager/classSchedule',navItem:'班级课程表'},
                // {name:'/manager/courseManager',navItem:'教学排课管理'},
            ],
            kpList: [
                {name:'/manager/examPlan',navItem:'学生考试安排'},
                {name:'/manager/examPaper',navItem:'学生考试题库'},
                
            ],
            cjList: [
                {name:'/manager/examScore',navItem:'学生考试成绩'},
            ],
            cpList: [
                {name:'/manager/evaluatePlan',navItem:'教学测评计划'},
                {name:'/manager/evaluateManager',navItem:'教学测评结果'}
            ],
            kqList: [
                // {name:'/manager/attendancePlan',navItem:'学生考勤内容'},
                {name:'/manager/attendanceResult',navItem:'学生考勤管理'}
            ],
            jyList: [
                {name:'/manager/infoAll',navItem:'就业信息汇总'},
                {name:'/manager/infoRecommend',navItem:'就业企业推荐'},
            ],
            ggList: [
                {name:'/manager/notice',navItem:'教学公告管理'},
            ],
            grList: [
                {name:'/manager/userManage',navItem:'账户信息管理'},
            ],
            stList: [
                {name:'/manager/start',navItem:'首页'},
            ]
        }

    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginout(){
        window.localStorage.removeItem("manInfo");
        this.$http.post('/users/loginout')
          .then((res)=>{
            console.log(res.data);
            this.$router.push('/login')

          })
      },
    },
    created: function() {
            console.log('页面加载')
            var username = JSON.parse(window.localStorage.manInfo).username;
            this.username = username
        }
    };
</script>