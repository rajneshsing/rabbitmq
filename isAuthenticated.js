const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
	
   /* const token = req.headers['authorization'].split(' ');

    jwt.verify(token[1], "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });
	*/
	// new added in main
	const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token,"secret",(err,data)=>{
        if(err)
        {
          res.json({data:err})
        }
        else
        {
			req.user = data;
          next();
        }
      })
     
    } else {
      res.send({ result: "Token not provided" });
    }

};
