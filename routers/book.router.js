const express = require('express');
const { saveBookWithUserRelation, getAllBooks, updateBook, deleteBook } = require('../controller/book.controller');

const router = express.Router();

router.post('/add', saveBookWithUserRelation);
router.get('/all', getAllBooks);
router.put('/update/:id', updateBook);
router.delete('/:id', deleteBook)
module.exports = router;