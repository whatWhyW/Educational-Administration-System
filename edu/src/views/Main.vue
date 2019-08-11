<template>
    <div>
        <el-container style="height: 100%">
            <el-header style="">
              <h1 style='line-height: 20px'>教务管理系统毕业设计</h1>
            </el-header>
        </el-container>
        <el-container>
          <el-aside width="240px" style="background-color: #e0dfdd">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">校园信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item class='manage'>教师管理</el-menu-item>
                <el-menu-item index="1-1-1">教师信息管理</el-menu-item>
                <el-menu-item index="1-2-2">教师教学管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="1-2">班级管理</span>
                <el-menu-item index="1-2-1">选项1</el-menu-item>
                <el-menu-item index="1-2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="1-2">学生管理</span>
                <el-menu-item index="1-2-1">选项1</el-menu-item>
                <el-menu-item index="1-2-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">教学考勤管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title" index="2-1">教师考勤管理</span>
                <el-menu-item index="2-1-1">教师考勤规则</el-menu-item>
                <el-menu-item index="2-1-2">教师考勤</el-menu-item>
                <el-menu-item index="2-1-3">教师考勤记录</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="2-2">学生考勤管理</span>
                <el-menu-item index="2-2-1">学生考勤规则</el-menu-item>
                <el-menu-item index="2-2-2">学生考勤</el-menu-item>
                <el-menu-item index="2-2-3">学生考勤记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">教学教务管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title" index="3-1">教学计划管理</span>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="3-2">教学任务分配</span>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="3-3">教学进度管理</span>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="3-4">教学课件管理</span>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">教学课程管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title" index="4-1">排课管理</span>
                <el-menu-item index="4-1-1">排课列表</el-menu-item>
                <el-menu-item index="4-1-2">课程时间</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="4-2">课表管理</span>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">教学考评管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title" index="5-1">教学题库管理</span>
                <el-menu-item index="5-1-1">阶段试题管理</el-menu-item>
                <el-menu-item index="5-1-2">系统试题管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="5-2">阶段考试管理</span>
                <el-menu-item index="5-2-1">考试计划</el-menu-item>
                <el-menu-item index="5-2-2">阅卷任务</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title" index="5-3">阶段测评管理</span>
                <el-menu-item index="5-3-1">测评计划</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>


<style lang='scss'>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 400px;
  }
  #app {
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-menu {
      height: 100%;
  }
  .mng {
    font-size: 20px;
  }
  .el-submenu__title {
    font-size: 20px;
  }
  .el-menu-item-group__title {
    font-size: 18px;
  }

  .element-style {
    height: 100%;
  }
  .el-aside {
    color: #333;
    height: 100%;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>