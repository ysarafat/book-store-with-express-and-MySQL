const express = require('express');
const { saveBookWithUserRelation, getAllBooks } = require('../controller/book.controller');

const router = express.Router();

router.post('/add', saveBookWithUserRelation);
router.get('/all', getAllBooks)
module.exports = router;