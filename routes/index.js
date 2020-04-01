const express = require('express');
const router = express.Router();
const axios = require('axios')
const Post = require('./admin/models/Post')
const moment = require('moment')

router.get('/', async(req, res, next)=> {
  try {
    if(req.isAuthenticated()){
      const url = `http://newsapi.org/v2/${
      req.query.searchForNews 
      ? 'everything?q='+req.query.searchForNews
      : 'top-headlines?country=us'
      }&apiKey=${process.env.GOOGLE_KEY}`
      const response = await axios.get(url)
      const allPostsInitial = await Post.find({})

      const allPosts = allPostsInitial.map((post) => {
        post.relativeTime = moment(post.time * 1000).fromNow()
        return post;
      })

      return res.render('index', {title: 'Main page', data: response.data, allPosts})
    }
    return res.render('auth/login');
  } catch (error) {
    console.log(error)
  }
});

router.get('/logout', (req,res,next) => {
  req.logout()
  req.session.destroy()
  return res.redirect('/')
})

module.exports = router;
