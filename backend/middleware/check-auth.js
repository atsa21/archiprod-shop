const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if(!token) {
            token = req.cookies.auth;
        }
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch(error) {
        token = req.cookies.auth;
        if (token) {
          res.status(403).json({ message: 'Not authorized' });
        } else {
          res.status(401).json({ message: 'Auth failed' });
        }
    }
};