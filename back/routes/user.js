const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

// 로그인 /user/login
router.post("/login", (req, res, next) => {
  // done의 callback이 다시옴   서버, 성공, 클라이언트에러
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(403).send(info.reason);
    }
    // req.login passport의 로그인 => 다통과하면 passport를 한번더 실행하기떄문
    // 혹시나 싶어서해주는것.
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // 성공
      return res.status(200).json(user);
    });
  })(req, res, next);
});

// 회원가입 /user
router.post("/", async (req, res, next) => {
  try {
    // Db저장하기전에 이메일 중복 확인
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 이메일입니다.");
    }
    // 비밀번호 암호화 10~12정도 높을수록 더 암호화가 정밀해짐 . 높을수록 속도저하
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
