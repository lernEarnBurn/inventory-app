var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home')
})

router.get('/shop', categoryController.getAllCategories)

router.get('/create-category', function(req, res, next){
  res.render('createCategory')
})

router.get('/create-item', function(req, res, next) {
  res.render('createItem')
})

module.exports = router;
