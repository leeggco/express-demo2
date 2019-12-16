var express = require('express');
var router = express.Router();
var models = require('../models');

// 查询全部文章 Promise 写法
// router.get('/', function(req, res, next) {
// 	models.Article.findAll().then(articles => {
// 		res.json({ articles: articles });
// 	})
// })

// 查询全部文章  async/await
router.get('/', async function (req, res, next) {
	var articles = await models.Article.findAll({
		// 排序
    order: [['id', 'DESC']],
	});
	res.json({ articles: articles });
});

module.exports = router;