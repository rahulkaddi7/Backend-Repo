const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //For getting forms data

// Mongoose Setup
main()
    .then(()=> console.log("Successfully connected"))
    .catch((err)=> console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

// Show all Chats
app.get("/chats" , async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs" ,{chats});
})

// ADD NEW CHAT
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})
app.post("/chats" , (req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        message:msg,
        created_at:new Date()
    });
    newChat.save()
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
    res.redirect("/chats");
});

// EDIT Chat
app.get("/chats/:id/edit" ,async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});