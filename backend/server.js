require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require('./authentication/passport');

// Import isLoggedIn middleware
const { isLoggedIn } = require('./authentication/auth-controllers');

// Authentication related routes
const authRoutes = require('./authentication/auth-routes');

// Gameplay related route imports
const buildingRoutes = require('./routes/gameplay-routes/building-routes');
const fleetRoutes = require('./routes/gameplay-routes/fleet-routes');
const armouryRoutes = require('./routes/gameplay-routes/armoury-routes');
const planetRoutes = require('./routes/gameplay-routes/planet-routes');

// Scheduler imports
const startProductionRateAgenda = require('./schedulers/mine-production-to-storage-updater');
const startConstructionQueueScheduler = require('./schedulers/construction-queue-schedular');
const startUpgradeQueueSchedular = require('./schedulers/building-queue-schedular');

// Create express app
const app = express();

// start express session
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Public Routes
app.use('/auth', authRoutes);

// Apply isLoggedIn middleware to protect all subsequent routes
//app.use(isLoggedIn);

// Protected Routes
app.use('/api/planet', planetRoutes);
app.use('/api/armoury', armouryRoutes);
app.use('/api/building', buildingRoutes);
app.use('/api/fleet', fleetRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {  

        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });

        // Start the production rate agenda
        try {
            await startProductionRateAgenda();
            console.log('Production rate agenda started.');
        } catch (error) {
            console.error('Error starting production rate agenda:', error);
        }

        // Start the upgrade queue scheduler
        try {
            await startUpgradeQueueSchedular();
            console.log('Upgrade Queue agenda started.');
        } catch (error) {
            console.error('Error starting Upgrade Queue agenda:', error);
        }

        // Initialize the construction queue scheduler
        try {
            await startConstructionQueueScheduler();
            console.log('Troop construction queue agenda started.');
        } catch (err) {
            console.error('Error in construction queue scheduler:', err);
        }
    })
    .catch((error) => {
        console.log(error);
    });
