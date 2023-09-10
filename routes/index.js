var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController.js')
const itemController = require('../controllers/itemController.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home')
})

router.get('/shop', categoryController.getAllCategories)

router.get('/shop/:name', categoryController.getCategory)

router.get('/shop/item/:id', itemController.getItem)

router.get('/create-category', categoryController.getCategoryCreate)

router.post('/create-category', categoryController.createCategory)

router.get('/create-item', itemController.getCreateItem)

router.post('/create-item', itemController.createItem)



module.exports = router;
