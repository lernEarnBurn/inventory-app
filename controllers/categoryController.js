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