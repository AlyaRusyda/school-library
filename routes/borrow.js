const express = require(`express`)
/** initiate object that instance of express */
const app = express()
app.use(express.json())
const borrowController = require('../controller/borrowController')

app.post("/addBorrow", borrowController.addBorrowing)
app.put("/:id", borrowController.updateBorrowing)
app.delete("/:id", borrowController.deleteBorrowing)
app.get("/return/:id", borrowController.returnBook)
app.get("/", borrowController.getBorrow)

module.exports = app