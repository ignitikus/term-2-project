const express = require('express');
const router = express.Router();
const User = require('../users/models/User')

const {deleteUser, updatePostVisibility} = require('./controllers/adminController')

router.put('/update-visibility/:id', updatePostVisibility)
router.delete('/delete-user/:email', deleteUser)

module.exports = router;
