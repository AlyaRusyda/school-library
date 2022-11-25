const express = require('express')
const app = express()
app.use(express.json())

const bookController = require("../controller/bookController")
const book = require('../models/book')
app.get("/getAllBooks", bookController.getAllBooks)
app.post("/addBook", bookController.addBook)
app.post("/find", bookController.findBook)
app.put("/:id", bookController.updateBook)
app.delete("/:id", bookController.deleteBook)

module.exports = app