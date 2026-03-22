const Note = require("../models/note.model")


const getNotes = async (userId) => {
    return await Note.find({ user: userId }).sort({ createdAt: -1 })
}

const getNoteById = async (id, userId) => {
    return await Note.findOne({ _id: id, user: userId })
}

const createNote = async (data) => {
    return await Note.create(data)
}

const deleteNote = async (id, userId) => {
    return await Note.findOneAndDelete({ _id: id, user: userId })
}

const updateNote = async (id, data, userId) => {
    return await Note.findOneAndUpdate(
        { _id: id, user: userId },
        data,
        { new: true, runValidators: true }
    )
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
}
