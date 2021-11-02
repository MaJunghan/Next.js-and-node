const express = require("express");
const psotRouter = require("./routes/post");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);

app.use("/post", psotRouter);

app.listen(3060, () => {
  console.log("서버 실행중");
});
