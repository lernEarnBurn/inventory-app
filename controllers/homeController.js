const Category = require('../models/category')

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.displayCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}, "name").exec()
    if (categories === null) {

        const err = new Error("Categories not found");
        err.status = 404;
        return next(err);
    }

    res.render('home', {all_categories: categories})
})