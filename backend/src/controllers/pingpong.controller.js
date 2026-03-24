const asyncHandler = require("../utils/asyncHandler")

const pingpongHandler = asyncHandler(async (req, res) => {
    await res.status(200).send("pong")
})

module.exports = { pingpongHandler }