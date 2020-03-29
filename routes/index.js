const express = require('express');
const router = express.Router();
const axios = require('axios')
const Post = require('./admin/models/Post')
const moment = require('moment')

/* GET home page. */
router.get('/', async(req, res, next)=> {
  if(req.isAuthenticated()){
    const url = `http://newsapi.org/v2/everything?q=covid&apiKey=${process.env.GOOGLE_KEY}`
    const response = await axios.get(url)
    const allPostsInitial = await Post.find({})

    const allPosts = allPostsInitial.map((post) => {
      post.relativeTime = moment(post.time * 1000).fromNow()
      return post;
    })
    console.log(allPosts)
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
