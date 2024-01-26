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

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: loginErr.message });
      }

      // Redirect to the '\welcome' route on the frontend
      const frontendUrl = 'http://localhost:3000'; // Replace with your frontend URL
      const redirectUrl = `${frontendUrl}/welcome`;

      res.redirect(redirectUrl);
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
  req.logout((err) => {
    if (err) { 
      return res.status(500).json({ error: err.message });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.send('Goodbye!');
    });
  });
};



const checkAuth = (req, res) => {
  // Check if the user is authenticated and send user information
  if (req.isAuthenticated()) {
    // Assuming req.user is populated with the user object upon successful authentication
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
};

module.exports = {
  checkAuth,
};


module.exports = {
  googleAuth,
  googleAuthCallback,
  isLoggedIn,
  logout, 
  entryPoint, 
  checkAuth
}
