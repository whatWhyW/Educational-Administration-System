var express = require('express');
var router = express.Router();
var teachTask = require('../models/TeachTask.js');
var courseTask = require('../models/CourseTask.js');
var ClassPlan = require('../models/ClassPlan.js');
var Class = require('../models/Class.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 教学任务分配处理
//获取所有信息的接口
router.get('/teachTaskAll',(req,res) => {
  // 通过模型去查找数据库
 teachTask.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editTeachTaskPlans", (req, res) => {
    console.log(req.body)
    teachTask.update({ _id: req.body._id }, req.body, (err, users) => {
        if (err) {
            res.json(err);
        } else {
            res.json(users);
        }
    })
})

// 增加
router.post("/addTeachTaskPlans", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    teachTask.find({courseName: req.body.courseName},
    (err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功' + data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        teachTask.create(req.body, (err, users) => {
            if (err) {
                res.json(err);
            } else {
                res.json(users);
            }
        })
      }
    }
  })
})


//删除接口
router.post('/delTeachTaskPlans',(req,res) => {
  // 通过模型去查找数据库
  teachTask.remove({courseName: req.body.courseName}, (err, data) => {
    teachTask.find((err,data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    });
  });
  
});




// 课程任务处理接口
//获取所有信息的接口
router.get('/coursePlansAll',(req,res) => {
  // 通过模型去查找数据库
 courseTask.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editCoursePlans", (req, res) => {
    console.log(req.body)
    courseTask.update({ _id: req.body._id }, req.body, (err, users) => {
        if (err) {
            res.json(err);
        } else {
            res.json(users);
        }
    })
})

// 增加
router.post("/addCoursePlans", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    courseTask.find({courseName: req.body.courseName},
    (err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功' + data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该课程名已经存在！'});
      }else{
        courseTask.create(req.body, (err, users) => {
            if (err) {
                res.json(err);
            } else {
                res.json(users);
            }
        })
      }
    }
  })
})

//删除接口
router.post('/delCoursePlans',(req,res) => {
  // 通过模型去查找数据库
  courseTask.remove({courseName: req.body.courseName}, (err, data) => {
    courseTask.find((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
  
 
});




// 教学课程表接口
var CourseSchedule = require('../models/CourseSchedule.js')
//获取所有信息的接口
router.get('/courseScheduleAll',(req,res) => {
  // 通过模型去查找数据库
  CourseSchedule.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editCourseSchedule", (req, res) => {
    console.log(req.body)
    CourseSchedule.update({ _id: req.body._id }, req.body, (err, data) => {
        CourseSchedule.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 增加
router.post("/addCourseSchedule", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    CourseSchedule.find({_id: req.body._id}, (err,data) => {
      console.log(data)
      console.log(req.body)
      CourseSchedule.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})
// 删除接口
router.post('/delCourseSchedule',(req,res) => {
  // 通过模型去查找数据库
  CourseSchedule.remove({_id: req.body.id}, (err, data) => {
    CourseSchedule.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});



// 班级安排计划接口
//获取所有信息的接口
router.get('/classPlanAll',(req,res) => {
  // 通过模型去查找数据库
 ClassPlan.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editClassPlan", (req, res) => {
    console.log(req.body)
    ClassPlan.update({ _id: req.body._id }, req.body, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
})

// 增加
router.post("/addClassPlan", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    ClassPlan.find({_id: req.body._id}, (err,data) => {
        ClassPlan.create(req.body, (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
       })
  })
})

//删除接口
router.post('/delClassPlan',(req,res) => {
  // 通过模型去查找数据库
  ClassPlan.remove({_id: req.body.id}, (err, data) => {
    ClassPlan.find((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({'status': 1000, 'message': '更新成功！', 'data': data});
    }
  })
  });
});


// 班级信息处理接口
router.get('/classesAll',(req,res) => {
  // 通过模型去查找数据库
 Class.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editClasses", (req, res) => {
    console.log(req.body)
    Class.update({ _id: req.body._id }, req.body, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
})

// 增加
router.post("/addClasses", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    Class.find({_id: req.body._id}, (err,data) => {
        Class.create(req.body, (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
       })
  })
})
//删除接口
router.post('/delClasses',(req,res) => {
  // 通过模型去查找数据库
  Class.remove({_id: req.body.id}, (err, data) => {
    Class.find((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});


var Student = require('../models/Student.js')
// 学生信息接口
//获取所有信息的接口
router.get('/studentsAll',(req,res) => {
  // 通过模型去查找数据库
  Student.find({}, (err,data) => {
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
        // if (err) {
        //     res.json(err);
        // } else {
        //     res.json(data);
        // }
        Student.find((err, data) => {
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



// 试卷计划窗口
var ExamPlan = require('../models/ExamPlan.js')
// 学生信息接口
//获取所有信息的接口
router.get('/examPlanAll',(req,res) => {
  // 通过模型去查找数据库
  ExamPlan.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 修改接口
router.post("/editExamPlan", (req, res) => {
    console.log(req.body)
    ExamPlan.update({ _id: req.body._id }, req.body, (err, data) => {
        // if (err) {
        //     res.json(err);
        // } else {
        //     res.json(data);
        // }
        ExamPlan.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})

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

//删除接口
router.post('/delExamPlan',(req,res) => {
  // 通过模型去查找数据库
  ExamPlan.remove({_id: req.body.id}, (err, data) => {
    ExamPlan.find((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});

// 学生成绩处理接口 只有查找、删除和修改
var Score = require('../models/Score.js')
// 学生信息接口
//获取所有信息的接口
router.get('/scoreAll',(req,res) => {
  // 通过模型去查找数据库
  Score.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editScore", (req, res) => {
    console.log(req.body)
    Score.update({ _id: req.body._id }, req.body, (err, data) => {
        Score.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 删除接口
router.post('/delScore',(req,res) => {
  // 通过模型去查找数据库
  Score.remove({_id: req.body.id}, (err, data) => {
    Score.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});

// 学生考勤管理处理接口
var Attendance = require('../models/Attendance.js')

//获取所有信息的接口
router.get('/attendanceAll',(req,res) => {
  // 通过模型去查找数据库
  Attendance.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editAttendance", (req, res) => {
    console.log(req.body)
    Attendance.update({ _id: req.body._id }, req.body, (err, data) => {
        Attendance.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 删除接口
router.post('/delAttendance',(req,res) => {
  // 通过模型去查找数据库
  Attendance.remove({_id: req.body.id}, (err, data) => {
    Attendance.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});


// 学生考勤结果窗口
var Evaluate = require('../models/Evaluate.js')
router.get('/evalute', (req, res) => {
  Evaluate.find({},　(err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})
router.post('/delEvaluate',(req,res) => {
  // 通过模型去查找数据库
  Evaluate.remove({_id: req.body.id}, (err, data) => {
    Evaluate.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});




// 教师信息处理接口
var Teacher = require('../models/Teacher.js')
// 学生信息接口
//获取所有信息的接口
router.get('/teacherAll',(req,res) => {
  // 通过模型去查找数据库
  Teacher.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editTeacher", (req, res) => {
    console.log(req.body)
    Teacher.update({ _id: req.body._id }, req.body, (err, data) => {
        Teacher.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 增加
router.post("/addTeacher", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    Teacher.find({_id: req.body._id}, (err,data) => {
      console.log(data)
      console.log(req.body)
      Teacher.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})
// 删除接口
router.post('/delTeacher',(req,res) => {
  // 通过模型去查找数据库
  Teacher.remove({_id: req.body.id}, (err, data) => {
    Teacher.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});


// 处理计划处理接口
var EvaluatePlan = require('../models/EvaluatePlan.js')
// 学生信息接口
//获取所有信息的接口
router.get('/evalutePlanAll',(req,res) => {
  // 通过模型去查找数据库
  EvaluatePlan.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
// 修改接口
router.post("/editEvalutePlan", (req, res) => {
    console.log(req.body)
    EvaluatePlan.update({ _id: req.body._id }, req.body, (err, data) => {
        EvaluatePlan.find((err, data) => {
          if (err) {
            console.log(err)
          } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
          }
        })
    })
})
// 增加
router.post("/addEvalutePlan", (req, res) => {
    //查询数据库中的name字段并与前段提交的数据匹配
    EvaluatePlan.find({_id: req.body._id}, (err,data) => {
      console.log(data)
      console.log(req.body)
      EvaluatePlan.create(req.body, (err, data) => {
          if (err) {
              res.json(err);
          } else {
              res.json(data);
          }
     })
  })
})
// 删除接口
router.post('/delEvalutePlan',(req,res) => {
  // 通过模型去查找数据库
  EvaluatePlan.remove({_id: req.body.id}, (err, data) => {
    EvaluatePlan.find((err, data) => {
      if (err) {
        // console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});



// 校园公告处理
var Notice = require('../models/Notice')
// 增加
router.post("/addNotice", (req, res) => {
  console.log(req)
  console.log(req.body)
  // Notice.find({title: req.body.title, val:req.body.val, time:req.body.name, cata:req.body.cata}, (err,data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     consle.log(data);
  //     res.send(data);
  //   }
  // });
  Notice.create(req.body, (err, data) => {
    if (err) {
        res.json(err);
    } else {
        res.json(data);
    }
  })
})
// 
router.get('/allNotice',(req,res) => {
  // 通过模型去查找数据库
  Notice.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
router.post('/delNotice',(req,res) => {
  // 通过模型去查找数据库
  Notice.remove({_id: req.body.id}, (err, data) => {
    Notice.find((err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    })
  });
});

module.exports = router