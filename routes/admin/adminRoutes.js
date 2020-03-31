const express = require('express');
const router = express.Router();
const User = require('../users/models/User')

const {
   deleteUser, 
   updatePostVisibility,
   deletePost
} = require('./controllers/adminController')

const {
   loginValidationFail,
   isAdmin
} = require('./utils/inputValidation')

router.put('/update-visibility/:id', isAdmin, loginValidationFail, updatePostVisibility)
router.delete('/delete-user/:email', isAdmin, loginValidationFail ,deleteUser)
router.delete('/delete-post/:postId', isAdmin, loginValidationFail ,deletePost)

module.exports = router;
