var express = require('express')
var bcrypt = require('bcryptjs')
var models = require('../models')
var router = express.Router()
var { jwtSign } = require('../utils/jwt')

// 此中间件只作用于此路由内，不会影响其他路由
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

// 注册用户
router.post('/register', async function (req, res, next) {
  // 密码加密
  const salt = bcrypt.genSaltSync(10)
  const hashPwd = bcrypt.hashSync(req.body.password, salt)
  const params = {
    username: req.body.username,
    password: hashPwd,
    nikename: req.body.nikename,
    phone: req.body.phone,
  }
  console.log(req.body)
	var user = await models.Users.create(params);
	res.json({ user: user });
});

// 用户登录
router.post('/login', async function (req, res, next) {
  const user = await models.Users.findOne({
    where: { username: req.body.username }
  })

  if (!user) {
    res.send({
      message: '用户名不存在！'
    })
  } else {
    //  bcrypt.compareSync 解密匹配，返回 boolean 值
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      return res.send({
        message: '密码无效！'
      })
    } else {
      const token = jwtSign({ id: user.id}) // 用引入的jwtSign方法生成token并返回
      return res.send({
        data: user,
        token: token,
        message: '密码正确，登录成功！'
      })
    }
  }
})

// /users/about 这样才能访问
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
