const {check} = require('express-validator')

module.exports = {
   loginInputValidation: [
      check('last', 'Name is required').not().isEmpty(),
      check('first', 'Name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('nickname', 'Username is required').not().isEmpty(),
      check('password', 'Password is required').isLength({min: 3})
   ],

      loginValidationFail: (req, res, next) => {
      if(req.isAuthenticated()) return next()
      req.flash('errors', 'You need to login/register to access website')
      return res.redirect('/')
   },
      isAdmin: (req, res, next) => {
      if(req.user.admin) return next()
      req.flash('errors', 'Only admin can make this changes')
      return res.redirect('/')
   }
}
