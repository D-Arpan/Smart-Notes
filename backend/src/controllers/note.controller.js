const {
    getNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
} = require("../services/note.service");
const asyncHandler = require("../utils/asyncHandler");


const getNotesHandler = asyncHandler(async (req, res) => {
    const notes = await getNotes(req.user.id)
    res.status(200).json({
        success: true,
        data: notes
    })
})

const getSingleNoteHandler = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await getNoteById(id, req.user.id);
    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: note
    });
})

const createNoteHandler = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const note = await createNote({
        title,
        description,
        user: req.user.id
    })
    res.status(201).json({
        success: true,
        data: note
    })
})

const deleteNoteHandler = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Note id is required"
        })
    }
    const deleted = await deleteNote(id, req.user.id)
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    })
})

const updateNoteHandler = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Note id is required"
        })
    }
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Note should have a title to be able to update"
        })
    }
    const updatedNote = await updateNote(id, { title, description }, req.user.id)
    if (!updatedNote) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Note updated",
        data: updatedNote
    })
})


module.exports = {
    getNotesHandler,
    createNoteHandler,
    getSingleNoteHandler,
    deleteNoteHandler,
    updateNoteHandler,
}
