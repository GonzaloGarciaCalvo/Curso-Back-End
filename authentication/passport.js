const User = require('../utils/userSchema')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { Types } = require('mongoose')

//Login
passport.use(
	"login",
	new LocalStrategy(
		{
			passReqToCallback: true,
			/* usernameField: "email", */
			passwordField: "password", //
		},
		async (req,username, password, done) => {
			try {
				const user = await User.findOne({ email:username });
				console.log("en passport login");
				const hashPass = user?.password;
				console.log("hashpassword", hashPass);
				if (!user || !comparePassword(password, hashPass)) {
					/* console.log("password:", password);
					console.log("hasspass", hashPass); */
					return done(null, false);
				} else {
					/* console.log("password:", password);
					console.log("hasspass", hashPass); */
					return done(null, user);
				}
			} catch (error) {
				console.log("error en password: ", error);
				/* done(error); */
			}
		}
	)
);

//Signgup
passport.use('signup', new LocalStrategy(
    {  passReqToCallback: true,
        /* usernameField: 'email', */
        /* passwordField: 'password' */ //
    },   
    async ( req, username, password, done) => {
        try {
            const {email, password, name, phone, age,address, role} = req.body
            const user = await User.findOne({
                email:email
                 /* username:username  */
            });
            /* req.username = user */
            console.log("req.body.username", req.body.email) //ok
            if (user) {
                return done(null, false)
            }

            const hashedPassword = hashPassword(password);
            const newUser = new User({ 
                email:email, 
                password: hashedPassword,
                name:name,
                age:age,
                phone:phone,
                address:address,
                role:role,
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
          console.log("user en passport login ", user)
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