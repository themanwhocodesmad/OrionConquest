const passport = require('passport')

const googleAuth = passport.authenticate('google', { scope: [ 'email', 'profile' ] })
const Planet = require('../models/game-models/building-models/planets-model')

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/auth/google/failure')
    }

    req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }

      // Check if the user already has a planet
      try {
        const existingPlanet = await Planet.findOne({ owner: user._id }).sort({ createdAt: 1 })

        if (existingPlanet) {
          // Redirect to the planet's page
          res.redirect('/planet/' + existingPlanet._id)
        } else {
          // If no planet exists, send a custom HTML response
          const htmlContent = `
            <html>
              <head><title>Welcome</title></head>
              <body>
                <h1>Welcome, ${user.displayName}</h1>
                <form action="/api/planet/initial" method="post">
                    <input type="submit" value="Create your new Planet" />
                </form>

              </body>
            </html>
          `
          res.send(htmlContent)
        }
      } catch (planetErr) {
        console.error('Error in finding/creating a planet:', planetErr)
        res.redirect('/error')
      }
    })
  })(req, res, next)
}


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
