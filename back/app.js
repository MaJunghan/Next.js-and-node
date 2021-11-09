const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportCinfig = require("./passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

// express에 db등록
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.error);

// pass port
passportCinfig();
// dotenv (쿠키 db password 암호화)
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// req.body사용하려면 해당 미들웨어를 설정해줘야함.
app.use(express.json()); //  json 형태의 값을 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // url 인코딩 방식으로 req.body에 넣어줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
