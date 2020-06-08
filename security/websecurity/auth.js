var web = function(req, res, next) {
    // TODO: add mongodb implementation
    console.log(req.session);
    if (req.session && req.session.user && req.session.role == "user") {
      
      return next();
    } else{
      
        res.status(403).end()
    } 
  };
  
module.exports = web;
  