const passport = require('passport')

const googleAuth = passport.authenticate('google', { scope: [ 'email', 'profile' ] })
const Planet = require('../models/game-models/building-models/planets-model')

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    req.login(user, async (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: loginErr.message });
      }

      try {
        const existingPlanet = await Planet.findOne({ owner: user._id }).sort({ createdAt: 1 });

        // Redirect to the frontend with the authentication status
        const frontendUrl = 'http://localhost:3000'; // Replace with your frontend URL
        res.redirect(`${frontendUrl}/auth-callback?hasPlanet=${!!existingPlanet}`);

      } catch (planetErr) {
        console.error('Error in finding/creating a planet:', planetErr);
        res.status(500).json({ error: 'Server error in planet check' });
      }
    });
  })(req, res, next);
};



const entryPoint = (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.sendStatus(401)
}

const logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.send('Goodbye!')
}

module.exports = {
  googleAuth,
  googleAuthCallback,
  isLoggedIn,
  logout, 
  entryPoint
}
