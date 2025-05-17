// https://www.npmjs.com/package/figlet

const figlet = require("figlet");

figlet("Hello  Ji !", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });