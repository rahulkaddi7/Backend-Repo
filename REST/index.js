const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"apnaCollege",
        content: "I love Coding!"
    },
    {
        id:uuidv4(),
        username:"RahulKaddi",
        content: "Smart Work>>>>Hard Work"
    },
    {
        id:uuidv4(),
        username:"PMO",
        content: "India and pakistan War stops for now"
    }
]

app.get("/posts" , (req,res)=>{
    res.render("index.ejs" , {posts});
})

app.get("/posts/new" ,(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts", (req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res)=>{
   let {id} =req.params;
   let post = posts.find((p) => id===p.id);
   res.render("show.ejs" , {post});
})

app.patch("/posts/:id" ,(req,res)=>{
    let {id} = req.params;
    res.send("Updating post");

})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})