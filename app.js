const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getDate = require("./date");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


//DB
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/todolistDB");

// schema 
const itemsSchema = mongoose.Schema({
    name : String
});

// collection 
const Item = mongoose.model("Item", itemsSchema);

// documents
const item1 = new Item({
    name: "Welcome"
})
const item2 = new Item({
    name: "Hi the +"
})
const item3 = new Item({
    name: "Delete item"
})

const defaultItem = [item1, item2, item3];

Item.insertMany(defaultItem, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Item send successfully");
    }
})

// todu array
let items = [];
let item;

// Home Route serve
app.get("/", (req, res) => {
    // const day = getDate();
    Item.find({}, (err, foundItems) => {
        res.render("list", { listTitle: "Today", newItems: foundItems }); 
    })
});


// app.get("/work", (req, res) => {
//     res.render("list", { listTitle: "Work List", newItems: items })
// });


// User form Data 
app.post("/", (req, res) => {
    item = req.body.todoItem;
    items.push(item);

    res.redirect("/");
});

// error page 
app.get("*", (req, res) => {
    res.render("errorPage");
});


// Server running
app.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
});