var express = require('express')
var router = express.Router()

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

// /users/about 这样才能访问
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
