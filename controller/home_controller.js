const Post = require('../models/posts');

const User = require('../models/users')

module.exports.homePage = async function(req, res){

    // using async and await 

    try{
       
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}


module.exports.homePage = async function(req, res){

    // using async and await 

    try{
       
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}


// module.exports.homePage = function(req,res){
//     Post.find({})
//     .sort('-createdAt')
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .then((posts)=>{
//         User.find({})
//         .then((users)=>{
//             return res.render('home',{
//                 posts: posts,
//                 title: "Home",
//                 all_users: users
//         })    
//         })
//     })
//     .catch((err)=>{
//         console.log("Error Fetching Posts", err);
//     })
// }