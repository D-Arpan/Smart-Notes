const bcrypt = require("bcrypt")
const User = require("../models/user.model")

const registerUser = async (email, password) => {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        const error = new Error("User already exists")
        error.statusCode = 400
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email,
        password: hashedPassword
    })

    return user
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error("Invalid credentials")
        error.statusCode = 400
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        const error = new Error("Invalid credentials")
        error.statusCode = 400
        throw error
    }

    return user
}

module.exports = {
    registerUser,
    loginUser
}