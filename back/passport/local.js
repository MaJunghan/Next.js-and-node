const passport = require("passport");
// 구조분해시 Strategy의 이름을 바꾸는법 :
const { Strategy: localStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        // 라우트에서받는 req.body.email 이값임 , req.body.id면 usernameField: "id"
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        // 비동기는 항상 await 사용시 항상 try/catch 감싸기
        try {
          // user에 이미 이메일,비번,닉네임 정보들이 다있음.
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            // passport로 응답을 해주는것은 아니다, done 결과값을 판단 해준다.
            // 자리 1번:서버에러, 2번: 성공, 3번: 클라이언트에러
            return done(null, false, { reason: "존재하지 않는 이메일입니다" });
          }
          // 1번 : 입력한 password 2번: db password
          const result = await bcrypt.compare(password, user.password);
          if (reslut) {
            // 비밀번호 일치시 2번쨰 성공에 사용자정보 넘겨주기
            return done(null, true);
          }
          // 비밀번호 틀리면
          return done(null, false, { reason: "비밀번호가 틀렸습니다!" });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
