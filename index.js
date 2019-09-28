const express = require('express')
const { mongoose } = require('./config/database')
const morgan = require('morgan')
// const { usersRouter } = require('./app/controllers/UsersController')
const router = require('./config/routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))
app.use('/', router)

app.listen(port, function () {
    console.log('listening on port', port)
})