var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated())res.redirect('/')
  return res.render('auth/login', { title: 'Express' });
});

module.exports = router;
