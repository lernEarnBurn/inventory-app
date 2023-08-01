#! /usr/bin/env node

console.log(
    'This script populates some categories and items to your database (without images). Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description){
    categoryDetails = {
        name: name,
        description: description
    }

    const category = new Category(categoryDetails)
    await category.save()
    categories[index] = category
    console.log(`created category: ${name}`)
}

async function itemCreate(index, name, description, category, price, inStock){
    itemDetails = {
        name: name,
        description: description,
        category: category,
        price: price,
        inStock: inStock
    }

    const item = new Item(itemDetails)
    await item.save()
    items[index] = item
    console.log(`created item: ${name}`)
}


async function createCategories(){
    console.log('adding categories...')
    await Promise.all([
        categoryCreate(0, "electronic", "all things that operate with electricity including phones, consoles, and appliances"),
        categoryCreate(1, "gardening", "all things a green thumbed individual may need to use"),
        categoryCreate(2, "fishing", "these items will be used for fishing and fishing related activities"),
        categoryCreate(3, "sports", "all things sports related for real homies")
    ])
}

async function createItems(){
    console.log('adding items')
    await Promise.all([
        itemCreate(0, "laptop", "a powerful laptop computer for bitcoin mining", [categories[0]], 650, 40),
        itemCreate(1, "automatic pitcher", "a high powered electric baseball pitcher to help you master hitting quicker than ever before", [categories[0], categories[3]], 8000, 4),
        itemCreate(2, "fishing rod", "give a man a fish and he eats for a day, teach a man to fish and he gets layed", [categories[2]] ,28 , 500),
        itemCreate(3, "hoe", "finally some hoes that are loyal",[categories[1]] ,12 , 999),
        itemCreate(4, "live bait", "the finest creepy crawlies to get all of the fishes to come to you",[categories[2]] ,2 , 10000),
        itemCreate(5, "flowers", "will make your house look decent and they smell good", [categories[1]] ,15 , 100),
        itemCreate(6, "basketball", "ball is life", [categories[3]] , 35, 700),
        itemCreate(7, "hydraulic fishing rod", "this thing can catch even the biggest of fish", [categories[0], categories[2]], 14000, 3)
    ])
}