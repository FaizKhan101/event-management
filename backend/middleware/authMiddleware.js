const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.guest) {
            return res.status(403).json({ message: "Guest users cannot perform this action" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
