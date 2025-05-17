const mongoose = require("mongoose");

main()
    .then(()=>console.log("Connection Succefull"))
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model("User",userSchema);

const user1 = new User({namde:"Adam" , email:"abc@gmail.com", age:48});
const user2 = new User({namde:"Eve" , email:"xyz@gmail.com", age:36});

user1.save();
user2.save();

User.find({})
  .then((data)=>{
    console.log(data);
  })