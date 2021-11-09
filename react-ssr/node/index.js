const express = require('express');
// const cors = require('cors');
const session = require('express-session');


let app = express();
// json请求
app.use(express.json())
// 表单请求
app.use(express.urlencoded({extended: false}))
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'zfpx'
}))
// app.use(cors({
//   origin: 'http://localhost:3000'
// }))

app.get('/api/users', (req, res) => {
  res.json([
    {
      id: 1, 
      name: '张三'
    },
    {
      id: 2, 
      name: '李四'
    }
  ])
})
app.post('/api/login', (req, res) => {
  let user = req.body;
  console.log(req);
  req.session.user = user;
  res.json({
    code: 0,
    data: {
      user,
      success: '登录成功'
    }
  })
})
app.get('/api/logout', (req, res) => {
  req.session.user = null;
  res.json({
    code: 0,
    data: {
      success: '退出成功'
    }
  })
})
app.get('/api/user', (req, res) => {
  let user = req.session.user;
  console.log(user);
  if (user) {
    res.json({
      code: 0,
      data: {
        success: '获取用户信息',
        user
      }
    })
  }
})

app.listen(4000, () => console.log('服务器已启动'));