var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var TeaMessage = require("../models/Teacher.js");  
router.post("/findMsg", (req, res) => {
    TeaMessage.findOne({teacherName: req.body.teacherName}, (err, data) => {
        if (err) {
            res.json(err);
        } else {
        	console.log(data);
            res.send(data);
        }
    })
})
router.post("/editTeacher", (req, res) => {
    console.log(req.body)
    TeaMessage.updateOne({ _id: req.body._id }, req.body, (err, data) => {
        TeaMessage.find({ _id: req.body._id }, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})



// 班级课程表接口
var ClassSchedule = require('../models/ClassSchedule.js')
//获取所有信息的接口
router.get('/classScheduleAll',(req,res) => {
  // 通过模型去查找数据库
  ClassSchedule.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editClassSchedule", (req, res) => {
    // console.log(req.body)
    ClassSchedule.update({ _id: req.body._id }, req.body, (err, data) => {
        ClassSchedule.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 增加
router.post("/addClassSchedule", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    ClassSchedule.find({_id: req.body._id}, (err,data) => {
      // console.log(data)
      // console.log(req.body)
      ClassSchedule.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})
// 删除接口
router.post('/delClassSchedule',(req,res) => {
  // 通过模型去查找数据库
  ClassSchedule.remove({_id: req.body.id}, (err, data) => {
    ClassSchedule.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});


var ClassMsg = require('../models/Class.js')
// 任职班级接口
router.post('/classAll',(req, res) => {
  ClassMsg.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})



// 任课学生信息处理接口
var Student = require('../models/Student.js')
// 学生信息接口
//获取所有信息的接口
router.post('/studentsAll',(req,res) => {
  // 通过模型去查找数据库
  Student.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editStudent", (req, res) => {
    console.log(req.body)
    Student.update({ _id: req.body._id }, req.body, (err, data) => {
        Student.find({className: req.body.className}, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})

// 增加
router.post("/addStudent", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    Student.find({_id: req.body._id}, (err,data) => {
      console.log(data)
      console.log(req.body)
      Student.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})

//删除接口
router.post('/delStudent',(req,res) => {
  // 通过模型去查找数据库
  Student.remove({_id: req.body.id}, (err, data) => {
    Student.find((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});


// 考试信息处理接口
// 试卷计划窗口
var ExamPlan = require('../models/ExamPlan.js')
router.post('/examPlanAll',(req,res) => {
  // 通过模型去查找数据库
  ExamPlan.find({teacherName: req.body.teacherName}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.post('/classExamPlanAll',(req,res) => {
  // 通过模型去查找数据库
  ExamPlan.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 增加
router.post("/addExamPlan", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    ExamPlan.find({_id: req.body._id}, (err,data) => {
      console.log(data)
      console.log(req.body)
      ExamPlan.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})


// 成绩处理接口
var Score = require('../models/Score.js')
// 获取
router.post('/scoreAll',(req,res) => {
  // 通过模型去查找数据库
  Score.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 添加
router.post("/addScore", (req, res) => {
      console.log(req.body)
      Score.create(req.body.form, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
})


// 学生考勤处理接口
var Attendance = require('../models/Attendance')
// 获取
router.post('/allAttendance',(req,res) => {
  // 通过模型去查找数据库
  Attendance.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 添加
router.post("/addAttendance", (req, res) => {
      console.log(req.body)
      Attendance.create(req.body.form, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
})


// 校园公告处理接口
var Notice = require('../models/Notice.js')
// 获取
router.post('/noticeAll',(req,res) => {
  // 通过模型去查找数据库
  Notice.find({cata: req.body.cata}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


module.exports = router;
