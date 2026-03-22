require("dotenv").config()
const app = require("./app")
const connectDB = require("./db/connection")

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port : ${PORT}`)
        })
    }
    catch (err) {
        console.error(`Failed to start the server : ${err}`)
    }
}

startServer()