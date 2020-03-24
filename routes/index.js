const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', async(req, res, next)=> {
  if(req.isAuthenticated()){
    const url = `http://newsapi.org/v2/everything?q=covid&apiKey=${process.env.GOOGLE_KEY}`
    const response = await axios.get(url)
    return res.render('index', {title: 'Main page', data: response.data})
  }
  return res.render('auth/login', { title: 'Express' });
});

router.get('/logout', (req,res,next) => {
  req.logout()
  req.session.destroy()
  return res.redirect('/')
})

module.exports = router;
