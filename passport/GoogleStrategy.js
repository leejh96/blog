const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback", //구글에서 데이터를 보낼 주소
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: "google",
          });
          //기존에 구글로 가입한 유저인지 확인
          if (exUser) {
            cb(null, exUser);
          } else {
            const newUser = await User.create({
              snsId: profile.id,
              provider: "google",
              username: profile._json.name,
              nick: profile._json.family_name,
              email: profile.emails[0].value,
              img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
            });
            cb(null, newUser);
          }
        } catch (error) {
          console.error(error);
          cb(err);
        }
      }
    )
  );
};
