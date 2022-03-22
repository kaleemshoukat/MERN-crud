const Post = require('../models/Post');     //model

exports.submitPost= (req, res) => {
    try{
        let post=new Post()
        post.title= req.body.title
        post.description= req.body.description
        post.save()

        res.status(200).json({
            status:true,
            message: 'Post created successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.posts=async (req, res, next)=> {
    // try {
    //     const posts=await Post.find({});
    //     res.render('posts.ejs', {posts: posts});
    // }
    // catch (error) {
    //     res.status(500).send(error);
    // }

    try {
        const limit=req.query.limit
        const offset=req.query.offset

        const items=await Post.find({}).limit(limit).skip(offset)
        const itemCount =await Post.count({})

        return res.status(200).json({
            status:true,
            message: "Success",
            items: items,
            itemCount: itemCount
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.delete= async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            status:true,
            message: "Forecast deleted successfully."
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.editPost= async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)

        return res.status(200).json({
            status:true,
            message: "Success!",
            data: post
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.updatePost= async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        post.title=req.body.title
        post.description=req.body.description
        post.save()

        return res.status(200).json({
            status:true,
            message: "Post updated successfully."
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

