const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    description: {
        type: String,
        min: 3,
        max: 1000,
        required: true
    }
},{
    timestamps: true
});

const Post=mongoose.model('Post', PostSchema)
module.exports=Post