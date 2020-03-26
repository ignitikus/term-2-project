const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
   author: {type: Schema.Types.ObjectId, ref:'User'},
   authorNickname: {type: 'String', trim: true, default: ''},
   title: {type:'String', trim: true, lowercase: true, required: true},
   visibility:{type: 'Boolean', default: true},
   picture:{type: 'String', default:'', trim: true},
   content:{type: 'String', default:'', trim:true},
   tags:{type: []},
   time :{type: Date, default: Date.now }
})


module.exports = mongoose.model('Post', PostSchema)