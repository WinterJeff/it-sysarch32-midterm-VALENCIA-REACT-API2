const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.spit(" ")[1];
        const decoded = jwt.verify(token, process.env.JWK_KEY);
        req.userData = decoded;
        next();
}   catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};