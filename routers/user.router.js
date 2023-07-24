const express = require('express');
const { createUser, getAllUsers } = require('../controller/user.controller');
const router = express.Router();

router.post('/register', createUser).get('/all', getAllUsers)
module.exports = router;