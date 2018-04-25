const express = require('express');
const router = express.Router();
const models = require('./../models');
const Page = models.Page;
const User = models.User;


router.route('/')
      .get((req, res) => {
        // sending the entire pages table
        res.redirect('/');
      })
      .post((req, res) => {
        let body = req.body;
        const user = User.create({
          name: body.name,
          email: body.email
        })
        const page = Page.create({
          title: body.title,
          content: body.content,
          status: body.status
        })
        .then((savedPage) => res.redirect(savedPage.urlTitle));
      })

router.get('/add', (req, res) => {
  res.render('addpage');

})

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then((result) => {
    console.log(result.dataValues);
    res.render('wikipage', result.dataValues)});
});

module.exports = router;
