var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 个人信息处理接口
var StuMessage = require("../models/Student.js");  
router.post("/findMsg", (req, res) => {
    StuMessage.findOne({name: req.body.studentName}, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            // console.log(data);
            res.send(data);
        }
    })
})
router.post("/editStudent", (req, res) => {
    console.log(req.body)
    StuMessage.updateOne({ _id: req.body._id }, req.body, (err, data) => {
        StuMessage.find({ _id: req.body._id }, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})

// 课程表接口
var ClassSchedule = require('../models/ClassSchedule')
router.post("/classScheduleAll", (req, res) => {
    console.log(req.body)
    ClassSchedule.find({ className: req.body.className }, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '查找成功！', 'data': data});
          }
    })
})


// 所在班级处理接口
var ClassMsg = require('../models/Class.js')

router.post('/classAll',(req, res) => {
  ClassMsg.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

// 试卷查看
var ExamPlan = require('../models/ExamPlan.js')
router.post('/examPlanAll',(req,res) => {
  // 通过模型去查找数据库
  ExamPlan.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 成绩处理接口
var Score = require('../models/Score.js')
// 获取
router.post('/scoreAll',(req,res) => {
  // 通过模型去查找数据库
  Score.find({studentName: req.body.studentName}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


// 考勤信息处理接口
var EvaluatePlan = require('../models/EvaluatePlan.js')
router.post('/evaluateAll', (req, res) => {
  console.log(req.body.className)
  EvaluatePlan.find({className: req.body.className}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data)
      res.send(data);
    }
  });
})

var Evaluate = require('../models/Evaluate.js')
router.post('/evaluate', (req, res) => {
  Evaluate.create(req.body.table, (err, data) => {
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
