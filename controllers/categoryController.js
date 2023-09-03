const Category = require('../models/category.js')
const Item = require('../models/item.js')

const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec()
    res.render('shop', {allCategories: allCategories})
})

exports.getCategory = asyncHandler(async (req, res, next) => {
    const categoryData = await Category.find({name: req.params.name}).exec()
    const categoryItems = await Item.find({category: {$in: categoryData[0].id}}).sort({name: 1}).exec()
    res.render('categoryPage', {categoryData: categoryData, categoryItems: categoryItems})
})

exports.getCategoryCreate = asyncHandler(async function(req, res, next) {
    res.render('createCategory')
})

exports.createCategory = [
    body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
    body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified."),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })

        if (!errors.isEmpty()) {
            res.render("createCategory", {
              category: category,
              errors: errors.array(),
            });
            return;
          } else {
            await category.save();
            res.redirect(category.url);
          }
    })
]