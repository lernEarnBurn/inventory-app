const Item = require('../models/item.js')
const Category = require('../models/category.js')
const Image = require('../models/image.js')

const { body, validationResult, ExpressValidator } = require("express-validator")
const asyncHandler = require("express-async-handler")


exports.getItem = asyncHandler(async function (req, res, next) {
    const itemData = await Item.findById(req.params.id).populate('category').exec()
    res.render('itemPage', {itemData: itemData})
})

exports.getCreateItem = asyncHandler(async function(req, res, next){
    const allCategories = await Category.find().exec()
    res.render('createItem', {allCategories: allCategories})
})


const multer = require('multer')


//image storage for item form

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: Storage
}).single('testImage')



exports.createItem = [
    body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
    body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must be specified."),
    body("categories")
    .trim()
    .isLength({min: 1})
    .withMessage("Must select categories."),
    body("price")
    .trim()
    .isLength({min: 1})
    .isNumeric()
    .toInt()
    .withMessage("Price Must Be Specified"),
    body("inStock")
    .trim()
    .isLength({min: 1})
    .isNumeric()
    .toInt()
    .withMessage("Quantity In Stock Must Be Specified"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        upload(req, res, (err) => {
            if(err){
                console.log(err)
            }else{
                const newImage = new Image({
                  name: req.body.image, 
                  image: {
                    data: req.file.buffer, 
                    contentType: req.file.mimetype 
                  }
                })
            }
        })

        try {
            await newImage.save();
            console.log('Image saved successfully');
          } catch (err) {
            console.error('Error saving image:', err);
          }

            
    


        const selectedCategories = JSON.parse(req.body.categories);

        const categoryPromises = selectedCategories.map(async (categoryName) => {
            const category = await Category.findOne({ name: categoryName }).exec();
            return category;
        });

        const categoryArray = await Promise.all(categoryPromises);

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: categoryArray,
            price: req.body.price,
            inStock: req.body.inStock
            //need to cop the image here
        })

        if(!errors.isEmpty()){
            res.render('createItem', {
                item: item,
                errors: errors.array()
            })
            return
        }else{
            await item.save()
            res.redirect(item.url)
        }  
    })
]