const express = require('express')
const parser = require('body-parser')
const services = require('./services')
const handlify = require('./handlers')
const app = express()
const port = 3000

const usersHandlers = handlify('users')
const postHandlers = handlify('posts')

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// Patrón injección de dependencias
app.get('/', usersHandlers(services).get)
app.post('/', usersHandlers(services).post)
app.put('/:id', usersHandlers(services).put)
app.delete('/:id', usersHandlers(services).delete)
// Patrón de composición
app.get('/posts', postHandlers(services).get)

app.listen(port, () => console.log(`Example app listening on port ${port}`))
