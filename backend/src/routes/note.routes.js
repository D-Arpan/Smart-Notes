const express = require("express")
const { getNotesHandler,
    createNoteHandler,
    deleteNoteHandler,
    getSingleNoteHandler,
    updateNoteHandler, } = require("../controllers/note.controller")


const router = express.Router()

router.get("/", getNotesHandler)
router.post("/", createNoteHandler)

router.get("/:id", getSingleNoteHandler)
router.delete("/:id", deleteNoteHandler)
router.patch("/:id", updateNoteHandler)


module.exports = router