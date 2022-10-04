const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } /* else {
      res.redirect("/signup"); 
      } */
}
module.exports = auth
