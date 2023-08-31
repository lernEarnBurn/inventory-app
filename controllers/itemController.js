const Item = require('../models/item.js')

const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.getItem = asyncHandler(async function (req, res, next) {
    const itemData = await Item.findById(req.params.id).populate('category').exec()
    res.render('itemPage', {itemData: itemData})
})