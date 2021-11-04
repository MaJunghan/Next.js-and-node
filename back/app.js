const express = require("express");
const psotRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

// express에 db등록
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);

// req.body사용하려면 해당 미들웨어를 설정해줘야함.
app.use(express.json()); //  json 형태의 값을 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // url 인코딩 방식으로 req.body에 넣어줌

app.use("/post", psotRouter);
app.use("/user", userRouter);

app.listen(3060, () => {
  console.log("서버 실행중");
});
