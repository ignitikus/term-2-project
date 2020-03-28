const express = require('express');
const router = express.Router();
const User = require('./models/User')
const Post = require('../admin/models/Post')
const {check,validationResult} = require('express-validator')
const passport = require('passport')
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/login', (req, res, next)=> {
  res.render('auth/login')
});

router.get('/profile', async(req,res,next) => {
  if(req.user.admin){
    return res.send('admin')
  }
  const allPosts = await Post.find({author: req.user._id})
  return res.render('auth/userProfile', {allPosts, error: ''})
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/login',
    failureFlash: true
  })
)

router.post('/register', [
      check('last', 'Name is required').not().isEmpty(),
      check('first', 'Name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('nickname', 'Username is required').not().isEmpty(),
      check('password', 'Password is required').isLength({min: 3})
  ],(req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    User.findOne({email:req.body.email }).then(user=>{
        if(user) {
          return res.render('auth/login')
          // req.flash('errors', 'User already exists')
        }

        const newUser = new User
        newUser.profile.first = req.body.first
        newUser.profile.last = req.body.last
        newUser.profile.avatar = '/images/default_avatar.png'
        newUser.nickname = req.body.nickname
        newUser.email = req.body.email
        newUser.password = req.body.password


        newUser.save().then(user=>{
          if(user) return req.login(user, (err) => {
              if(err) return res.status(400).json({confirmation: false, message: err})
              // next()
              res.redirect('/')
          })
        }).catch(err=> next(err))
    }).catch(err=> next(err))
  }
)

router.put('/update-profile', async(req,res,next) => {
  const theUser = await User.findOne({email: req.user.email})
  if(req.body.avatar) theUser.profile.avatar = req.body.avatar
  if(req.body.first) theUser.profile.first = req.body.first
  if(req.body.last) theUser.profile.last = req.body.last
  if(req.body.email) theUser.email = req.body.email
  if(req.body.nickname) theUser.nickname = req.body.nickname

  theUser.save(user=>{
    return res.redirect('/api/users/profile')
  }).then(err=>console.log(err))
})

router.put('/update-password', async(req,res,next) => {
  const theUser = await User.findOne({email: req.user.email})
  const {oldPassword, newPassword, newPasswordRepeat} = req.body
  if(oldPassword || newPassword || newPasswordRepeat){
    if(newPassword !== newPasswordRepeat){
      req.flash('errors', 'The repeat password doesn\'t match')
      return res.redirect('back')
    } 
    const result = await bcrypt.compare(oldPassword, theUser.password)
    if(!result){
      req.flash('errors', 'Old password doesn\'t match')
      return res.redirect('back')
    } 
    theUser.password = newPassword
    await theUser.save((user) => {
      req.flash('success', 'Password updated')
      return res.redirect('back')
    }).then(err=>console.log(err))
  }
  req.flash('errors', 'Fill old fields to change password')
  return res.redirect('back')
})

router.post('/createpost', (req,res,next) => {
  let newPost = new Post()
  newPost.author = req.user._id
  newPost.authorNickname = req.user.nickname
  newPost.title = req.body.title
  newPost.picture = req.body.pictureURL
  newPost.content = req.body.content
  newPost.tags = req.body.tags.split(',').map(tag=>tag.trim())
  newPost.save().then((post) => {
    return res.redirect('/')
  }).catch(err=>console.log(err))
})

module.exports = router;
