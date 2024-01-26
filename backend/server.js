require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Import connect-mongo
const passport = require('passport');
require('./authentication/passport');


// Authentication related routes
const authRoutes = require('./authentication/auth-routes');

// Gameplay related route imports
const onboardingRoutes = require('./controllers/v1/routes/onboardingRoutes')
const planetRoutes = require('./controllers/v1/routes/planetRoutes')

// Scheduler imports
const startProductionRateAgenda = require('./schedulers/mine-production-to-storage-updater');
const startConstructionQueueScheduler = require('./schedulers/construction-queue-schedular');
const startUpgradeQueueSchedular = require('./schedulers/building-queue-schedular');

// Create express app
const app = express();

// start express session
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Use MongoDB for session store
    cookie: {
      httpOnly: true, // Prevents client side JS from reading the cookie 
      secure: false, // Should be true in production with HTTPS
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
//app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body);
    next();
});

// Middleware to attach userId to req
const attachUserId = (req, res, next) => {
    if (req.isAuthenticated()) {
      req.userId = req.user._id;
    }
    next();
  };

// Public Routes
app.use('/auth', authRoutes);


// Apply attachUserId middleware globally
app.use(attachUserId)

// Protected Routes
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/planet', planetRoutes)


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
