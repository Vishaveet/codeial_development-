const Post=require('../../../models/posts');
const Comment=require('../../../models/comments');
module.exports.index= async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}


module.exports.destroy = async function(req, res){
    console.log('ji');
    try{
        console.log('inside',req.params.id);

        let post = await Post.findById(req.params.id);
        console.log("post:",post);
      if(post.user == req.user.id ){

     
            post.deleteOne();

            await Comment.deleteMany({post: req.params.id});

        
            return res.json(200, {
                message:"Post associated with its comments is deleted"
            });
         }else{
            return res.json(401, {
                message:"Unathorized User!"
            });
         }

    }catch(err){
        console.log("error",err);
        return res.json(500, {
            message:"something went wrong in your code"
        });
    }
    
}