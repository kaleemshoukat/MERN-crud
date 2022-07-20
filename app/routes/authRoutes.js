//import express and route
const router  = require('express').Router();
//required controllers
const authController = require('../controllers/authController');
const authMiddleware= require('../middlewares/authMiddleware')

//routes
router.post('/login', authController.login);

router.use(authMiddleware.authenticateTokenApi)
router.get('/logout', authController.logout)

// export to use in server.js
module.exports = router;