const express = require('express');
const router = express.Router();
const axios = require('axios')
const Post = require('./admin/models/Post')

/* GET home page. */
router.get('/', async(req, res, next)=> {
  if(req.isAuthenticated()){
    const url = `http://newsapi.org/v2/everything?q=covid&apiKey=${process.env.GOOGLE_KEY}`
    const response = await axios.get(url)
    const allPosts = await Post.find({})
    return res.render('index', {title: 'Main page', data: response.data, allPosts})
  }
  return res.render('auth/login');
});

router.get('/logout', (req,res,next) => {
  req.logout()
  req.session.destroy()
  return res.redirect('/')
})

module.exports = router;
