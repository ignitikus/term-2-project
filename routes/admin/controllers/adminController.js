const User = require('../../users/models/User')
const Post = require('../models/Post')

module.exports ={
   deleteUser: async(req,res,next) => {
      try {
         const theUser = await User.findOne({email: req.params.email})
         if(theUser.admin){
            req.flash('errors2', 'Cannot delete admin account')
            return res.redirect('back')
         }
         await User.deleteOne({email: req.params.email})
         req.flash('success', `${theUser.profile.email} deleted from database`)
         return res.redirect('back')
      } catch (error) {
         console.log(error)
      }
   },

   updatePostVisibility: async (req,res,next) => {
      const thePost = await Post.findById(req.params.id)
      if(thePost.visibility){
         thePost.visibility = false
         await thePost.save().then((post) => {
            return res.redirect('back')  
         }).catch(err=>console.log(err))
      }
      thePost.visibility = true
      await thePost.save().then((post) => {
         return res.redirect('back')  
      }).catch(err=>console.log(err))
   }

}