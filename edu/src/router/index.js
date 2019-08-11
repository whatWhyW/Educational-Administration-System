import Vue from 'vue'
import Router from 'vue-router'

// import Test from '@/views/Test.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Manager from '@/views/Manager.vue'
import Teacher from '@/views/Teacher.vue'
import Student from '@/views/Student.vue'

import start from '@/views/Manager/start.vue'
import userManage from '@/views/Manager/userManage.vue'
import teacherMsgManage from '@/views/Manager/teacherMsgManage.vue'
import classMsgManager from '@/views/Manager/classMsgManager.vue'
import studentMsgMange from '@/views/Manager/studentMsgMange.vue'
import teachPlan from '@/views/Manager/teachPlan.vue'
import fileUpload from '@/views/Manager/fileUpload.vue'
import teachTask from '@/views/Manager/teachTask.vue'
import coursePlan from '@/views/Manager/coursePlan.vue'
import courseSchedule from '@/views/Manager/courseSchedule.vue'
import classSchedule from '@/views/Manager/classSchedule'
import courseManager from '@/views/Manager/courseManager.vue'
import classPlan from '@/views/Manager/classPlan'
import examPlan from '@/views/Manager/examPlan.vue'
import examPaper from '@/views/Manager/examPaper.vue'
import evaluatePlan from '@/views/Manager/evaluatePlan.vue'
import evaluateResult from '@/views/Manager/evaluateManager.vue'
import attendanceResult from '@/views/Manager/attendanceResult.vue'
import infoAll from '@/views/Manager/infoAll.vue'
import infoRecommend from '@/views/Manager/infoRecommend.vue'
import notice from '@/views/Manager/notice.vue'
import examScore from '@/views/Manager/examScore.vue'


// import HelloWorld from '@/components/HelloWorld'

import teaStart from '@/views/Teacher/start.vue'
import teaMessage from '@/views/Teacher/teaMessage.vue'
import teaCoursePlan from '@/views/Teacher/coursePlan.vue'
import teaSchedule from '@/views/Teacher/courseSchedule.vue'
import teaClassSchedule from '@/views/Teacher/classSchedule.vue'
import teaClassMsgManager from '@/views/Teacher/classMsgManager.vue'
import studentMsgManager from '@/views/Teacher/studentMsgManager.vue'
import teaExamPlan from '@/views/Teacher/examPlan.vue'
import classExamPlan from '@/views/Teacher/classExamPlan.vue'
import teaScoreManager from '@/views/Teacher/scoreManager.vue'
import teaNotice from '@/views/Teacher/notice.vue'
import teaAttendanceManager from '@/views/Teacher/attendanceManager'

import stuStart from '@/views/Student/start.vue'
import stuMessage from '@/views/Student/stuMessage.vue'
import stuCoursePlan from '@/views/Student/coursePlan.vue'
import stuSchedule from '@/views/Student/courseSchedule.vue'
import stuClassSchedule from '@/views/Student/classSchedule.vue'
import stuExamPlan from '@/views/Student/examPlan.vue'
import stuClassMessage from '@/views/Student/classMessage.vue'
import stuScoreMsg from '@/views/Student/scoreMsg.vue'
import stuEvaluate from '@/views/Student/evaluate.vue'
import stuNotice from '@/views/Student/notice.vue'



Vue.use(Router)

let routes = [
  // { path: '/test', name: 'Test', component: Test },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/main', name: 'Main', component: Main },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    children: [
      
      { path: 'userManage', component: userManage },
      { path: 'studentMsgMange', component: studentMsgMange },
      { path: 'teachPlan', component: teachPlan,
        children: [
        { path: '/manager/teachPlan/fileUplode', component: fileUpload },
        ]
      },
      { path: 'teachTask', component: teachTask },
      { path: 'coursePlan', component: coursePlan },
      { path: 'classSchedule', component: classSchedule },
      { path: 'courseSchedule', component: courseSchedule },
      { path: 'courseManager', component: courseManager },
      { path: 'classPlan', component: classPlan },
      { path: 'classMsgManager', component: classMsgManager },
      { path: 'examPlan', component: examPlan },
      { path: 'examPaper', component: examPaper },
      { path: 'evaluatePlan', component: evaluatePlan },
      { path: 'evaluateManager', component: evaluateResult },
      { path: 'attendanceResult', component: attendanceResult },
      { path: 'infoAll', component: infoAll },
      { path: 'infoRecommend', component: infoRecommend },
      { path: 'notice', component: notice },
      { path: 'teacherMsgManage', component: teacherMsgManage },
      { path: 'examScore', component: examScore },
      { path: '*', component: start },

    ]
  },
  // { path: '/teacherMsgManage', component: teacherMsgManage },


  { path: 
    '/teacher', 
    name: 'Teacher', 
    component: Teacher,
    children: [
      { path: 'teaMessage', component: teaMessage},
      { path: 'coursePlan', component: teaCoursePlan},
      { path: 'courseSchedule', component: teaSchedule},
      { path: 'classSchedule', component: teaClassSchedule},
      { path: 'classMsgManager', component: teaClassMsgManager},
      { path: 'studentMsgManager', component: studentMsgManager},
      { path: 'examPlan', component: teaExamPlan},
      { path: 'classExamPlan', component: classExamPlan},
      { path: 'scoreManager', component: teaScoreManager},
      { path: 'notice', component: teaNotice},
      { path: 'attendanceManager', component: teaAttendanceManager},
      { path: '*', component: teaStart },

      
    ]
  },

  { path: 
    '/student', 
    name: 'Student', 
    component: Student, 
    children: [
      { path: 'stuMessage', component: stuMessage},
      { path: 'coursePlan', component: stuCoursePlan},
      { path: 'courseSchedule', component: stuSchedule},
      { path: 'classSchedule', component: stuClassSchedule},
      { path: 'examPlan', component: stuExamPlan},
      { path: 'evaluate', component: stuEvaluate},
      { path: 'classMessage', component: stuClassMessage},
      { path: 'scoreMsg', component: stuScoreMsg},
      { path: 'notice', component: stuNotice},
      { path: '*', component: stuStart },
  
    ]
  },
  { path: '*', name: 'Login', component: Login }






]
export default new Router({ routes })
