const { faker, tr } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'delta_app',
  password: 'KADDIrahul'
});

// console.log(getRandomUser());

// HOME PAGE
app.get("/",(req,res)=>{
    let q = "SELECT COUNT(*) FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let users= result[0]["COUNT(*)"];
            res.render("home.ejs",{users,port});  
        });
    }
    catch{
        res.send("SOME ERROR OCCURED");
    }
});

// SHOW ALL USERS
app.get("/user", (req,res)=>{
    let q = "SELECT* FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.render("user.ejs",{result});  
        });
    }
    catch{
        res.send("SOME ERROR OCCURED");
    }
});

// EDIT USERNAME 
app.get("/user/:id/edit" ,(req,res)=>{
    let id = req.params.id.trim();
    let q = `SELECT* FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            console.log(user); 
            res.render("edit.ejs" ,{user});  
        });
    }
    catch{
        res.send("SOME ERROR OCCURED");
    }
});
// UPDATE USERNAME
app.patch("/user/:id" ,(req,res)=>{
    let id = req.params.id.trim();
    let q = `SELECT* FROM user WHERE id='${id}'`;
    let {password: formPass , username: newUsername} = req.body;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            console.log(user); 
            if(formPass!=user.password){
                res.send("Incorrect password");
            }
            else{
                let q = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                try{
                connection.query(q,(err,result)=>{
                    if(err) throw err;
                    let user = result[0];
                    console.log(user); 
                    res.redirect("http://localhost:8080/user");  
                });
                }
                catch{
                    res.send("SOME ERROR OCCURED");
                }
            }
    });
    }
    catch{
        res.send("SOME ERROR OCCURED");
    }
});

// Add NEW USER
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

// DELETE USER
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
