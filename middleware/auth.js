const auth = (req, res, next) => {
 /*  console.log("en middleware auth") */
    if (req.isAuthenticated()) {
      // con req.isAuthenticated() rompe por error is not e function,  
      //si le saco los () rompe  SyntaxError: Unexpected token 'catch' in C:\Users\HP\Desktop\Curso BACKEND\DESAFIOS\Proyecto-BackEnd\Curso-Back-End\views\pages\signup.ejs while compiling ejs
      next();
    } else {
      res.redirect("/signup"); 
      }
}
module.exports = auth
