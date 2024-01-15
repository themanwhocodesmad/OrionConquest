const createInitialPlanetPage = (req, res) => {
    const userDisplayName = req.user.displayName // Assuming the displayName is stored in req.user
  
    const htmlContent = `
      <html>
        <head><title>Welcome</title></head>
        <body>
          <h1>Welcome, ${userDisplayName}</h1>
          <p><a href="/planet/initial">Create your first Planet!</a></p>
        </body>
      </html>
    `
  
    res.send(htmlContent)
  }
  