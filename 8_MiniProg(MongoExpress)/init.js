const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=> console.log("Successfully connected"))
    .catch((err)=> console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from:"David",
        to:"John",
        message:"Hello, how are you?John",
        created_at: new Date(),
    },
    {
        from:"John",
        to:"David",
        message:"I am good, What's the matter?",
        created_at: new Date(),
    },
    {
        from:"David",
        to:"John",
        message:"Whats this Project about? What is Rahul building??",
        created_at: new Date(),
    },
    {
        from:"Rahul",
        to:"David",
        message:"This is a Mini project based on MongoDB and Express, in which I am building something similar to whatsapp(basic version)",
        created_at: new Date(),
    },
    {
        from:"Rahul",
        to:"David",
        message:"Main focus is on integrating Mongo with Express, so dont expect very fascinating frontend :/",
        created_at: new Date(),
    },
]

Chat.insertMany(allChats);