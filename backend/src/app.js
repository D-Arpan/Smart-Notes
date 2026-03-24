const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const noteRoutes = require("./routes/note.routes")
const pingpongRoutes = require("./routes/pingpong.routes")
const errorHandler = require("./middlewares/error.middleware")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/ping", pingpongRoutes)

app.use("/auth", authRoutes)
app.use("/notes", noteRoutes)

app.use(errorHandler)
module.exports = app
