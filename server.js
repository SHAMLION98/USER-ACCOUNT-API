const express = require('express')
const mongoDbConnection = require('./db/mongoConnection')
require('dotenv').config()



const app = express()

const port = process.env.PORT


app.listen(port, ()=> console.log (`listening to port ${port}`))