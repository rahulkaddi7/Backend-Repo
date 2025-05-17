const express = require("express");
const app = express();

const port = 8080;

// ------------------------------------------------------------------App.use-----------------------------------------------------------------------------
// app.use((req,res) => {
//     console.log("Request Recieved");
//     let responsee ="This is a basic respons";
//     // responsee = "<h1>Fruits</h1> <ul><li>Mango</li><li>Orange</li></ul> "; 

//     res.send(responsee);
// })

// ---------------------------------------------------------------Routing-------------------------------------------------------------------------------------------------------------------------------------------

app.get("/" , (req,res)=>{
    res.send("You are in Homee page");
})
app.get("/apple", (req,res)=>{
    res.send("You are in apple page");
})
// app.get("*" , (req,res)=>{
//     res.send("Invalid Page");
// })

// ----------------------------------------------------------------Path-Parameter---------------------------------------------------------------------------------------------------------------------------------------------
app.get("/:username/:pass" ,(req,res) => {
    console.log(req.params);
    
    let {username,pass} = req.params;
    res.send(`You are in @${username}'s page and their password is ${pass}`);
})

// ---------------------------------------------------------------Query-strings-------------------------------------------
app.get("/search" ,(req,res) =>{
    let {q} = req.query;

    if(!q){
        res.send("Nothing searched");
    }
    res.send(`Search result for query: ${q}`);
})

// ------------------------------------------------------------------To-Start-----------------------------------------------------------------------------
app.listen(port ,()=>{
    console.log(`app is listening on port ${port}`);
})

