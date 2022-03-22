//import express and route
const router  = require('express').Router();
//required controllers
const postController = require('../controllers/postController');

//routes
router.post('/add-post', postController.submitPost);
router.get('/posts', postController.posts);
router.delete('/delete-post/:id', postController.delete);
router.get('/edit-post/:id', postController.editPost);
router.put('/update-post/:id', postController.updatePost);

// export to use in server.js
module.exports = router;