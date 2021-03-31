const express = require('express')

require('dotenv').config()

const app = express()

app.use(express.json())

const hasher = require('./routes/hash')
const encoder = require('./routes/encode')
const decoder = require('./routes/decode')

app.use('/hasher', hasher)
app.use('/encoder', encoder)
app.use('/decoder', decoder)

module.exports = app;