const mysql = require("mysql");

const PersianCMSDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "persian_cms",
});

console.log(PersianCMSDB);

module.exports = PersianCMSDB;
