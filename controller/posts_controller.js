const Post = require('../models/posts');
const Comment = require('../models/comments')

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        console.log(post);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    user:req.user.name
                },
                message:"post create!"
            });
        }
        
        req.flash('success', 'Posted Successfully!');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error', err);
        console.log("Error",err);
        return res.redirect('back');
    }
}
module.exports.destroy = async function(req,res){
    try{
        // console.log("hi",req.params.id);
        const post = await Post.findById(req.params.id);
        // console.log("Post",post);
        // console.log("Post.user", post.user);
        // console.log("req.user",req.user);
        if(post.user == req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post:req.params.id})
            console.log("Before Xhr");
            if(req.xhr){
                console.log("Inside XhR Delete");
               return res.status(200).json({
                data: {
                    post_id : req.params.id
                },
                message: "Post Deleted"
               }) 
            }
        }
        console.log("Xhr Not Working");
        return res.redirect('back');
    }
    catch(err){
        console.log("error",err);
    }
}