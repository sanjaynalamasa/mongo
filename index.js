const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main().then(() =>{
    console.log("connection success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let chat1 = new Chat({
    from: "sanjay",
    to: "thanush",
    message: "hi thanush are you studeing well",
    created_at: new Date()
});
chat1.save().then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err)
});

//index Route
app.get("/chats", async (req, res) =>{
    let chats = await Chat.find();
    // console.log(chats);
    // res.send("working");
    res.render("index.ejs", {chats});
});

//New Route
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
    let {from, to, message} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date
    });
    // console.log(newChat);
    newChat
    .save()
    .then((res) =>{
        console.log("chat was Saved!");
    })
    .catch(err => {
        console.log("Chat was Not-Save!");
    });
    // res.send("working");
    res.redirect("/chats");

});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let {message: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {message: newMsg},
        {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});



app.get("/", (req, res) => {
    res.send(" root working");
});


app.listen("8080", () => {
    console.log(`server is listining on port number ${port}`);
});