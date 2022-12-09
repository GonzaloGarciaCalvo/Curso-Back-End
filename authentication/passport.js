const User = require('../utils/userSchema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { Types } = require('mongoose')
/// Strategies  ///

//Login
passport.use('login', new LocalStrategy(
  async (username, password, done) => {
      try {
          const user = await User.findOne({ username });
          /* userNameGlobal.username = username
          console.log("req.username ", userNameGlobal) */
          const hassPass = user?.password
          if (!user || !comparePassword(password, hassPass)) {
              return done(null, false)
          } else {
              return done(null, user)
          }
      }
      catch (error) {
          console.log("error en password: ", error)
          done(error)
      }
  }
))

//Signgup
passport.use('signup', new LocalStrategy(
  {  passReqToCallback: true},  
  async ( req, username, password, done) => {
      try {
          const user = await User.findOne({ username:username });
          /* req.username = user */
          console.log("req.body.username", req.body.username)
          if (user) {
              return done(null, false)
          }
          const hashedPassword = hashPassword(password);
          const newUser = new User({ 
              username:username, 
              password: hashedPassword 
          });

         /*  email,
          password: hashedPassword,
          nombre: nombre,
          direccion: direccion,
          edad: edad,
          telefono: telefonoRegistrado,
          foto: foto,
          ordenes: ordenes */

          await newUser.save();
          console.log("req.username ", user)
          return done(null, newUser);
      } catch(error) {
          console.log("error en signup ",error)
      }
}));

//Serializer
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  id = Types.ObjectId(id);
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;