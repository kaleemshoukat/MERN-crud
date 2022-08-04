const Post = require('../models/Post');     //model
const User = require('../models/user');     //model
const firebaseService = require('../services/firebaseService')

exports.submitPost= async (req, res) => {
    try{
        const body=req.body
        let post=new Post()
        post.title= body.title
        post.description= body.description
        post.save()

        //firebase
        const user=await User.findById(req.user_id)
        const firebaseToken=user.firebaseToken
        if (firebaseToken){
            var payload = {
                notification: {
                    title: body.title,
                    body: body.description
                }
            };
            var options = {
                priority: "high",
                sound: "default",
                timeToLive: 60 * 60 * 24
            };

            firebaseService.admin.sendToDevice(firebaseToken, payload, options)
                .then(function(response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function(error) {
                    console.log("Error sending message:", error);
                });
        }

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
            message: "Deleted successfully."
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

