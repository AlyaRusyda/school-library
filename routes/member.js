const express = require('express')
const app = express()
app.use(express.json())

const memberController = require("../controller/memberController")
const member = require('../models/member')
app.get("/getAllMember", memberController.getAllMember)
app.post("/findMember", memberController.findMember)
app.post("/", memberController.addMember)
app.put("/:id", memberController.updateMember)
app.delete("/:id", memberController.deleteMember)

module.exports = app