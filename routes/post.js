var express = require('express');

const auth = require('../controllers/auth');
const post = require("../controllers/post");

var router = express.Router();



router.use(auth.protect);

router.get('/posts', post.getAllPosts);
router.get('/posts/:id', post.getPost);
router.post('/posts', post.createPost);
router.delete('/posts/:id', post.deletePost);


module.exports = router;

