const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'delta_app',
  password: 'KADDIrahul'
});

let getRandomUser = ()=>{
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
}

let q = "INSERT INTO user VALUES ?";
// let val = [123,"abc","abc@gmail","abc123"];
let val = [];
for(let i=0;i<100;i++){
  val.push(getRandomUser());
}


try{
  connection.query(q,[val],(err,result)=>{
    if(err) throw err;
    console.log(result);
});
}
catch{
    console.log(err); 
}

connection.end();

// console.log(getRandomUser());