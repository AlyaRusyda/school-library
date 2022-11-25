const express = require(`express`)
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const cors = require(`cors`)
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const memberRoute = require('./routes/member')
const member = require("./models/member")
const {getAllMember, findMember} = require("./controller/memberController")
app.use('/member', memberRoute)

const adminRoute = require('./routes/admin')
const admin = require("./models/admin")
const {getAllAdmin, findAdmin} = require("./controller/adminController")
app.use('/admin', adminRoute)

const bookRoute = require('./routes/book')
const book = require("./models/book")
const {getAllBook, findBook} = require("./controller/bookController")
app.use('/book', bookRoute)

const borrowRoute = require(`./routes/borrow`)
app.use(`/borrow`, borrowRoute)

app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
    ${PORT}`)   
})