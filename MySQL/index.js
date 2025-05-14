const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'delta_app',
  password: 'KADDIrahul'
});

try{
    connection.query("SHOW TABLES",(err,result)=>{
    if(err) throw err;
    console.log(result);
});
}
catch{
    console.log(err); 
}

connection.end();

let getRandomUser = ()=>{
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

console.log(getRandomUser());