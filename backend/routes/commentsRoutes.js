const express = require("express");
const PersianCMSDB = require("./../db/Persian-CMS");

const commentsRouter = express.Router();

// routes

commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT Comments.id, Comments.isAccept , Comments.body, Comments.date, Comments.hour, Users.firstname as userID, Products.title as productID FROM Comments INNER JOIN Users ON Users.id = Comments.userID INNER JOIN Products ON Products.id = Comments.productID`;

  PersianCMSDB.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;

  let deleteCommentQuery = `DELETE FROM Comments WHERE id = ${commentID}`;
  PersianCMSDB.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let editCommentQuery = `UPDATE Comments SET body="${req.body.body}" WHERE id = ${commentID}`;

  PersianCMSDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/accept/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE Comments SET isAccept = 1 WHERE id = ${commentID}`;

  PersianCMSDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/reject/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE Comments SET isAccept = 0 WHERE id = ${commentID}`;

  PersianCMSDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = commentsRouter;
