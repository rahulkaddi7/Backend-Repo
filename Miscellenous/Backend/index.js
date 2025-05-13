const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extende:true}));
app.use(express.json());

app.get("/register", (req,res)=>{
    res.send("STD GET req");
});

app.post("/register", (req,res)=>{
    let {user,password} = req.body; 
    res.send(`STD POST req , Welcome ${user}`);
});

app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
});