const express = require("express")
const cors = require("cors")
const noteRoutes = require("./routes/note.routes")
const errorHandler = require("./middlewares/error.middleware")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/notes", noteRoutes)

app.use(errorHandler)
module.exports = app