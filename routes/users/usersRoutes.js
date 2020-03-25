const express = require('express');
const router = express.Router();
const User = require('./models/User')
const Post = require('../admin/models/Post')
const {check,validationResult} = require('express-validator')
const passport = require('passport')

/* GET users listing. */
router.get('/login', (req, res, next)=> {
  res.render('auth/login')
});

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
              res.render('index', {title: 'Success', user})
          })
        }).catch(err=> next(err))
    }).catch(err=> next(err))
  }
)

router.post('/createpost', (req,res,next) => {
  let newPost = new Post()
  newPost.author = req.user._id
  newPost.title = req.body.title
  newPost.picture = req.body.pictureURL
  newPost.content = req.body.content
  newPost.tags = req.body.tags.split(',').map(tag=>tag.trim())
  newPost.save().then((post) => {
    return res.redirect('/')
  }).catch(err=>console.log(err))
})

module.exports = router;
