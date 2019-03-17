const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoClient = require('mongodb').MongoClient

const userRoute = require('./routes/users')

const mongoURI = 'mongodb+srv://dbUser:dbPassword@spotitube-vdky5.azure.mongodb.net/test?retryWrites=true'
let db

app.use(bodyParser.json())

app.use('/users', userRoute)

mongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Spotitube')
    app.listen(3000, function () {
        console.log('listening on port 3000')
    })
})