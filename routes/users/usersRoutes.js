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
} = require('../admin/utils/inputValidation')

router.get('/login', getLogin);
router.get('/profile', getProfile)
router.post('/login', login)
router.post('/register', loginInputValidation, register)
router.put('/update-profile', updateProfile)
router.put('/update-password', updatePassword)
router.post('/createpost', createPost)

module.exports = router;
