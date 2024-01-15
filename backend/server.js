require('dotenv').config()
const express = require('express')
const mineRoutes = require('./routes/mines-routes');
const storeRoutes = require('./routes/stores-routes');
const researchLabRoutes = require('./routes/researchLab-routes');
const solarRoutes = require('./routes/solar-routes');
const tradeRoutes = require('./routes/trade-routes');
const shieldRoutes = require('./routes/shield-routes');
const commsRoutes = require('./routes/comms-routes');
const loginRoutes = require('./routes/user-routes')
const cors = require('cors');




const { default: mongoose } = require('mongoose');


// Create express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
//Cors middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this specific origin
}));

// routes

app.use('/api/mines', mineRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/researchLab', researchLabRoutes)
app.use('/api/solarArray', solarRoutes)
app.use('/api/tradeDepot', tradeRoutes)
app.use('/api/shield', shieldRoutes)
app.use('/api/comms', commsRoutes)
app.use('/api/users', loginRoutes) //includes registration


// connect to MongoDB
mongoose.connect(process.env.mongo_uri_shane)
    .then(() => {
        // Listen for requests once we have connect to DB
        app.listen(process.env.PORT_Shane, () => {
            console.log('connected to db & listening on port', process.env.PORT_Shane)
        })

    })
    .catch((error) => {
        console.log(error)
    })


