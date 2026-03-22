const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    }
)

const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel

module.exports = noteModelorts = noteModel