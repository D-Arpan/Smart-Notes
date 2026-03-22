const asyncHandler = require("../utils/asyncHandler")
const jwt = require("jsonwebtoken")
const { registerUser, loginUser } = require("../services/auth.service")

const registerHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        })
    }

    const user = await registerUser(email, password)

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email
        }
    })
})

const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        })
    }

    const user = await loginUser(email, password)

    const token = jwt.sign(
        { userId: user._id },          // payload
        process.env.JWT_SECRET,        // secret key
        { expiresIn: "1d" }            // optional
    )

    res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user._id,
            email: user.email
        }
    })
})

module.exports = { registerHandler, loginHandler }