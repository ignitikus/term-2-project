const express = require('express');
const router = express.Router();

const{
  getLogin,
  getProfile,
  login,
  register,
  updateProfile,
  updatePassword,
  createPost
} = require('./controllers/userController')

const {
  loginInputValidation,
  loginValidationFail
} = require('../admin/utils/inputValidation')

router.get('/login', getLogin);
router.get('/profile',loginValidationFail, getProfile)
router.post('/login', login)
router.post('/register', loginInputValidation, register)
router.put('/update-profile', loginValidationFail, updateProfile)
router.put('/update-password', loginValidationFail, updatePassword)
router.post('/createpost',loginValidationFail, createPost)

module.exports = router;
