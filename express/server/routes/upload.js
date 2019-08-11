let express = require('express');
let router = express.Router();
let fs = require('fs');
let multer = require('multer');

let storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, 'upload/')
  },
  filename (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

let createFoler = (folder) => {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

createFoler('./upload')

let upload = multer({storage: storage})

/* POST upload/file listing */
router.post('/file', upload.single('file'), function (req, res, next) {
  console.log(req.body)
  // const file = req.files.file
  // console.log('文件类型：%s', file.mimetype);
  // console.log('原始文件名：%s', file.originalname);
  // console.log('文件大小：%s', file.size);
  // console.log('文件保存路径：%s', file.path);
  if (req.file === undefined) {
    res.json({
      'code': '1',
      'msg': '未检测到上传的文件！'
    })
    return
  }
  res.json({
    'code': 0,
    'msg': 'OK'
  })
});

module.exports = router;