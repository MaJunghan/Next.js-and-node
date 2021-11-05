// passport-local 로그인 : 아이디,비번 이나 이메일,비번시 사용
const passport = require("passport");
const local = require("./local");

// passport는 app.js에 부착
module.exports = () => {
  passport.serializeUser(() => {});
  passport.deserializeUser(() => {});
  //localStrategy 는 index.js에 부착
  local();
};
