var web = function(req, res, next) {
    // TODO: add mongodb implementation
    console.log(req.session);
    if (req.session && req.session.user && req.session.role == "user") {
      
      return next();
    } else{
        req.session.redirect = req.originalUrl;
        res.redirect("/web/login");
    } 
  };
  
module.exports = web;
  