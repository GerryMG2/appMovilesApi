var admin = function(req, res, next) {
    // TODO: add mongodb implementation
    console.log(req.session.admin);
    if (req.session && req.session.user && req.session.admin == "administrador") {
      
      return next();
    } else{
      
      return res.redirect("/admin/login");
    } 
  };
  
module.exports = admin;
  