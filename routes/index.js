const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);

router.get('/', function(req, res){
  res.render('index');
})

module.exports = router;
