//import express and route
const router  = require('express').Router();
//required controllers
const authController = require('../controllers/authController');
const authMiddleware= require('../middlewares/authMiddleware')

//routes
router.post('/login', authController.login);
router.post('/login-social', authController.loginSocial);

router.use(authMiddleware.authenticateTokenApi)
router.get('/logout', authController.logout)
router.post('/store-token', authController.storeToken)

// export to use in server.js
module.exports = router;