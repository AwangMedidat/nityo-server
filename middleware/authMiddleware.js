const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Silahkan Login Ulang'});
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ success: false, message: 'Silahkan Login Ulang'});
    }
};

module.exports = authenticate;
