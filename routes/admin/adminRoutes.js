const express = require('express');
const router = express.Router();
const User = require('../users/models/User')

const {
   deleteUser, 
   updatePostVisibility
} = require('./controllers/adminController')

const {
   loginValidationFail
} = require('./utils/inputValidation')

router.put('/update-visibility/:id', loginValidationFail, updatePostVisibility)
router.delete('/delete-user/:email', loginValidationFail ,deleteUser)

module.exports = router;
