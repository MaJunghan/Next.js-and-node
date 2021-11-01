const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello node");
});

app.listen(3060, () => {
  console.log("서버 실행중");
});
