var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//教师注册
router.post('/register',(req,res) => {
  //这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
  //查询数据库中name= req.body.name 的数据
  User.find({username:req.body.username}, //查询数据库中的name字段并与前段提交的数据匹配
    (err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功'+data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        let newName = new User({   //向数据库添加数据
          username: req.body.username,
					category: req.body.category,
					password: req.body.password
        });
        //newName.save 往数据库中插入数据
        newName.save((err,data) => {
          if (err) {
            res.send({'status': 1002, 'message': '注册失败！', 'data': err});
          } else {
            res.send({'status': 1000, 'message': '注册成功!'});
          }
        });
      }
    }
  })
})


// 教学管理员检测
router.post('/findManager', (req, res) => {
  User.find({category: req.body.category}, (err, data) =>　{
     if (err) {
      // res.send(err);
      res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
    } else {
      res.send(data);
    }
  })
})

//登录接口
router.post('/login',(req,res) => {
  User.find({username:req.body.username, password:req.body.password}, (err,data) => {//查询并匹配
    if (err) {
      // res.send(err);
      res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
    } else {
      
      if (data.length > 0) {
        req.session.username = data.username;
        req.session.password = data.password;
        res.send({'status': 1000, 'message': '登录成功!', 'data': data});
      } else {
        res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
      }
    }
  })
})


//安全退出登录
router.post('/loginout',(req,res)=>{


  res.json({ //以json格式输出给前端 内容可以任意设置 前端可以res.data接收
    status:'0',
    msg:'',
    result:''
  })
})



//获取所有账号的接口
router.get('/all',(req,res) => {
  // 通过模型去查找数据库
 User.find({}, (err,data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 管理员修改账户信息接口
router.post("/editUsers", (req, res) => {
    console.log(req.body)
    User.update({ _id: req.body._id }, req.body, (err, users) => {
        if (err) {
            res.json(err);
        } else {
            res.json(users);
        }
    })
})

// 增加一个用户
router.post("/addUsers", (req, res) => {
    //使用Student model上的create方法储存数据
    User.find({username: req.body.username},//查询数据库中的name字段并与前段提交的数据匹配
    (err,data) => {
    if(err){
      res.send({'status': 1002, 'message': '查询失败', 'data': err});
    }else{
      console.log('查询成功' + data)
      //data为返回的数据库中的有相同name的集合
      if(data.length > 0){
        res.send({'status': 1001, 'message': '该用户名已经注册！'});
      }else{
        User.create(req.body, (err, users) => {
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

//删除账号接口
router.post('/delUsers',(req,res) => {
  // 通过模型去查找数据库
  User.remove({username: req.body.username}, (err, data) => {
    User.find((err,data) => {
      if (err) {
        console.log(err)
      } else {
        res.send({'status': 1000, 'message': '更新成功！', 'data': data});
      }
    });

  });
  
});


module.exports = router