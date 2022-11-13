require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usermodel = require('../models/UserModel');
const userInstance = new Usermodel();


const loadPassport = (passport) => {

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {

      const user_role = "customer";
      const user = await userInstance.getByEmail(email);
      if (user == null) return done(null, false, { message: "Incorrect email." });
      if (!user_role) return done(null, false);

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
  
    } catch (err) {
      return done(err)
    }

  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {

    return done(null, userInstance.getById(id)
    )

  })
}

const checkAuthentication = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(400).json({ message: 'Please login' });

}
module.exports = { loadPassport, checkAuthentication };