var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated())return res.render('index', {title: 'Main page'})
  return res.render('auth/login', { title: 'Express' });
});


router.get('/test', (req,res,next) => {
  res.render('test')
})
module.exports = router;
