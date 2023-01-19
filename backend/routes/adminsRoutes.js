const express = require("express");
const PersianCMSDB = require("./../db/Persian-CMS");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = "${adminToken}"`;

  PersianCMSDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
