require('dotenv').config()
const express = require('express')
const mineRoutes = require('./routes/mines-routes')
const storeRoutes = require('./routes/stores-routes')
const researchLabRoutes = require('./routes/researchLab-routes')


const { default: mongoose } = require('mongoose')


// Create express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes

app.use('/api/mines', mineRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/researchLab', researchLabRoutes)


// connect to MongoDB
mongoose.connect(process.env.MONGO_URI_Shane)
    .then(() => {
        // Listen for requests once we have connect to DB
        app.listen(process.env.PORT_Shane, () => {
            console.log('connected to db & listening on port', process.env.PORT_Shane)
        })

    })
    .catch((error) => {
        console.log(error)
    })


