const express = require('express');
const router = express.Router();

const{
  getLogin,
  getProfile,
  login,
  register,
  updateProfile,
  updatePassword,
  createPost,
  addComment
} = require('./controllers/userController')

const {
  loginInputValidation,
  loginValidationFail
} = require('../admin/utils/inputValidation')

router.get('/login', getLogin);
router.get('/profile',loginValidationFail, getProfile)
router.post('/login', login)
router.post('/register', loginInputValidation, register)
router.post('/createpost',loginValidationFail, createPost)
router.post('/add-comment/:id/:user', addComment)
router.put('/update-profile', loginValidationFail, updateProfile)
router.put('/update-password', loginValidationFail, updatePassword)

module.exports = router;
