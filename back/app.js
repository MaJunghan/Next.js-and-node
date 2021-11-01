const express = require("express");
const psotRouter = require("./routes/post");

const app = express();

app.use("/post", psotRouter);

app.listen(3060, () => {
  console.log("서버 실행중");
});
