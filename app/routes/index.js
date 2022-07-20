const router  = require('express').Router();
const authRoutes=require('./authRoutes')
const postRoutes=require('./postRoutes')
const userRoutes=require('./userRoutes')
const authMiddleware= require('../middlewares/authMiddleware')

router.use(authRoutes);

router.use(authMiddleware.authenticateTokenApi)
router.use(postRoutes);
router.use('/users', userRoutes);


module.exports = router