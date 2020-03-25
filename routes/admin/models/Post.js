const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
   author: {type: Schema.Types.ObjectId, ref:'User'},
   title: {type:'String', trim: true, lowercase: true, required: true},
   visibility:{type: 'Boolean', default: true},
   picture:{type: 'String', default:'', trim: true},
   content:{type: 'String', default:'', trim:true},
   tags:{type: []}
})


module.exports = mongoose.model('Post', PostSchema)