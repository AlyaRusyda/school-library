const express = require('express')
const app = express()
app.use(express.json())

const adminController = require("../controller/adminController")
const admin = require('../models/admin')
app.get("/getAllAdmin", adminController.getAllAdmin)
app.post("/findAdmin", adminController.findAdmin)
app.post("/", adminController.addAdmin)
app.post("/find", adminController.findAdmin)
app.put("/:id", adminController.updateAdmin)
app.delete("/:id", adminController.deleteAdmin)

module.exports = app