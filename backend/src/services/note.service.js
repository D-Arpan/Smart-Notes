const Note = require("../models/note.model")


const getNotes = async () => {
    return await Note.find().sort({ createdAt: -1 })
}

const getNoteById = async (id) => {
    return await Note.findById(id)
}

const createNote = async (data) => {
    return await Note.create(data)
}

const deleteNote = async (id) => {
    return await Note.findByIdAndDelete(id)
}

const updateNote = async (id, data) => {
    return await Note.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true
    })
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
}