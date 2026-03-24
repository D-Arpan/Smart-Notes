const express = require("express")
const {pingpongHandler} = require("../controllers/pingpong.controller")

const router = express.Router()

router.get("/", pingpongHandler)

module.exports = router