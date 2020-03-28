const {check} = require('express-validator')

module.exports = {
   loginInputValidation: [
      check('last', 'Name is required').not().isEmpty(),
      check('first', 'Name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('nickname', 'Username is required').not().isEmpty(),
      check('password', 'Password is required').isLength({min: 3})
   ]
}
