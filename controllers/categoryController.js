const Category = require('../models/category.js')

const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec()
    res.render('shop', {allCategories: allCategories})
})

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.find({name: req.params.name}).exec()
    res.render('categoryPage', {categoryData: category})
})