const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../routes/users/models/User')
const bcrypt = require('bcryptjs')

passport.serializeUser((user, done) => {
   done(null, user._id)
})

passport.deserializeUser((id,done) => {
   User.findById(id, (err, user) => {
      done(err, user)
   })
})

passport.use('local-login', new LocalStrategy({
   usernameField:'email',
   passwordField:'password',
   passReqToCallback: true
}, (req, email, password, done) => {
   User.findOne({email:req.body.email}, (err, user) => {
      if(err){
         console.log('Login error: ', err)
         return done(err, null)
      } 
      if(!user) {
         console.log('No user found')
         return done(null, false, req.flash('errors', 'No user has been found'))
      }
      
      bcrypt.compare(password, user.password).then(result => {
         if(!result) return done(null, false, req.flash('errors', 'Check email or passport'))
         return done(null, user)
      }).catch((err) => {
         throw err
      })
   })
}))
