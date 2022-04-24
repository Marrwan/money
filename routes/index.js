var express = require('express');

const auth = require('../controllers/auth');
var router = express.Router();



router.post('/register', auth.register)

router.get('/verify/:token', auth.verify)

router.post('/login', auth.login)

router.post('/logout', auth.logout)

module.exports = router;
