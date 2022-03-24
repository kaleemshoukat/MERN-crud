const router  = require('express').Router();
//required controllers
const userController = require('../controllers/userController');

//routes
router.post('/add', userController.add);
router.get('/list', userController.list);
router.delete('/delete/:id', userController.delete);
router.get('/edit/:id', userController.edit);
router.put('/update/:id', userController.update);

// export to use in server.js
module.exports = router;