<template>
    <div>
        <el-container>
            <el-header style="">
              <span style='font-size: 30px; font-weight: bold; float: left' class='mySystem'>教务管理系统毕业设计</span>
              <a @click="loginout" style='float: right; text-decoration: none; color: #552299'>安全退出</a>
              <span style='float: right; margin-right: 15px'>欢迎 <i>{{username}}</i> 使用</span>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width="260px" height='100%' style="background-color: #B3C0D1">
               <!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group> -->
                <el-menu :default-active="this.$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  style="background-color: #B3C0D1">
                    <el-submenu index="0">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in stList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">个人信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in xxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in jxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">任课班级管理</span>
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
                            <el-menu-item v-for="(item,i) in ksList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="8">
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
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学公告信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in ggList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main><el-main><router-view></router-view></el-main></el-main>
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
            stList: [
                {name:'/teacher/start',navItem:'首页'},
            ], 
            xxList: [
                {name:'/teacher/teaMessage',navItem:'个人信息管理'},
            ],
            jxList: [
                // {name:'',navItem:'教学计划安排'},
                {name:'/teacher/coursePlan', navItem:'教学课程安排'},
                {name:'/teacher/courseSchedule', navItem:'教学课程表'},
                {name:'/teacher/classSchedule', navItem:'班级课程表'},
            ],
            bjList: [
                {name:'/teacher/classMsgManager',navItem:'班级信息管理'},
            ],
            xsxxList: [
                {name:'/teacher/studentMsgManager',navItem:'学生信息管理'},
            ],
            ksList: [
                {name:'/teacher/examPlan',navItem:'主责考试安排'},
                {name:'/teacher/classExamPlan',navItem:'班级考试安排'},
                
            ],
            cjList: [
                {name:'/teacher/scoreManager',navItem:'学生成绩管理'},
            ],
            kqList: [
                {name:'/teacher/attendanceManager',navItem:'学生考勤管理'},
            ],
            ggList: [
                {name:'/teacher/notice',navItem:'教学公告查看'}
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
        window.localStorage.removeItem("teaInfo")
        this.$http.post('/users/loginout')
          .then((res)=>{
            console.log(res.data);
            this.$router.push('/login')

          })
      },
    },
    created: function() {
        console.log('页面加载')
        var username = JSON.parse(window.localStorage.teaInfo).username;
        this.username = username
    }
};
</script>