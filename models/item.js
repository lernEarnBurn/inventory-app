const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: [{type: Schema.Types.ObjectId, ref: "Category", required: true}],
    price: {type: Number, required: true},
    inStock: {type: Number, required: true},
    image: {type: Schema.Types.ObjectId, ref: "Image"}
})


ItemSchema.virtual('url').get(function () {
    return `/home/item/${this.id}`
})

ItemSchema.virtual('priceString').get(function () {
    return `$${this.price.toString()}`
})

module.exports = mongoose.model("Item", ItemSchema)