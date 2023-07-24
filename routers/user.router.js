const express = require('express');
const { createUser, getAllUsers, loginUser } = require('../controller/user.controller');
const router = express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/all', getAllUsers)
module.exports = router;