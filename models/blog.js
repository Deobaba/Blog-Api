
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'title can not be blank'],
        unique:true,
    },
    description:{
        type: String,
        required:[true,'description can not be blank']
    },
    state:{
        type: String,
        enum:['draft', 'published'],
        default:'draft'

    },
    author: String,
    read_count:{
        type:Number,
        default:0
    },
    tags: String,
    body:{
        type: String,
        required:[true,'body cant be blank']
    }
}, { timestamps:true})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;