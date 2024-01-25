const express = require('express');
const router = express.Router();
const {
  entryPoint, 
  logout,
  googleAuth, 
  googleAuthCallback, 
  checkAuth
} = require('./auth-controllers');

router.get('/', entryPoint);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.get('/logout', logout);
router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});
router.get('/check-auth',checkAuth);


module.exports = router;
