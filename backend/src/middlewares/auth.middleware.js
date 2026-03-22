const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from header
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1]

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. Attach user info
        req.user = { id: decoded.userId }

        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware