<template>
    <div class='box'>
        <el-container>
            <el-header style="">
              <span style='font-size: 30px; font-weight: bold; float: left' class='mySystem'>教务管理系统毕业设计</span>
              <a @click="loginout" style='float: right; text-decoration: none; color: #552299'>安全退出</a>
              <span style='float: right; margin-right: 15px'>欢迎 <i>{{username}}</i> 使用</span>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width="260px" style="background-color: #B3C0D1">
                <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
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
                            <span slot="title">个人信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in xxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">班级信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in bjList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学计划</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in jxList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">本阶段课表</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in kbList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">考试安排</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in ksList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">成绩查询</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in cjList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学评测</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="(item,i) in cpList" :key="i" :index="item.name">{{ item.navItem }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">教学公告</span>
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
  .box {
    height: 100%;
  }
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
                {name:'/student/start',navItem:'首页'},
            ], 
            xxList: [
                {name:'/student/stuMessage',navItem:'个人信息管理'},
            ],
            jxList: [
                {name:'/student/coursePlan',navItem:'个人教学计划'},
            ],
            kbList: [
                {name:'/student/courseSchedule',navItem:'教学安排课表'},
                {name:'/student/classSchedule',navItem:'班级课程课表'},
            ],
            ksList: [
                {name:'/student/examPlan',navItem:'考试安排'},
            ],
            cjList: [
                {name:'/student/scoreMsg',navItem:'成绩查看'},
            ],
            cpList: [
                {name:'/student/evaluate',navItem:'教学测评'}
            ],
            ggList: [
                {name:'/student/notice',navItem:'公告查看'},
            ],
            bjList: [
                {name:'/student/classMessage',navItem:'班级信息'},
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
      logOut() {
          console.log('退出系统');
      },
      loginout(){
        window.localStorage.removeItem("stuInfo");
        this.$http.post('/users/loginout')
          .then((res)=>{
            console.log(res.data);
            this.$router.push('/login')

          })
      },
    },
    created: function() {
        console.log('页面加载')
        var username = JSON.parse(window.localStorage.stuInfo).username;
        this.username = username
    }
};
</script>