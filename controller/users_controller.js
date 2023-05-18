const passport = require('passport')
const User = require('../models/users');
const fs = require('fs');
const path = require('path')

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user_sign_up',{
        title:"Sign Up Page"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title:"Sign In Page"
    })
}


// To get sign Up data
module.exports.create = function(req,res){
    console.log("Body",req.body);

    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.redirect('/users/sign-in');
            }
            else{
                User.create(req.body);
                return res.redirect('/users/sign-in');
            }
        })
        .catch(err => {
            console.log("Error Creating User");
            return res.redirect('/users/sign-up');
        })
}


module.exports.profile = function(req,res){
    User.findById(req.params.id)
    .then((user)=>{
        return res.render('profile',{
            title:"Profile",
            profile_user: user
        })
    })
}

// module.exports.update = async function(req,res){
//     try{
//         if(req.user.id == req.params.id){
//             await User.findByIdAndUpdate(req.params.id, req.body)
//             return res.redirect('back');
//         }
//         else{
//             return res.status(401).send('Unauthorized');
//         }
//     }
//     catch(err){
//         console.log("User Doesnt MAtch");
//     }
// }

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{       
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("********Multer Err:", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                
                if(req.file){
                    if(user.avatar){
                        // if user have avatar it will delete the previouse one
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar ));
                    }
                    user.avatar = User.avatarPath+ '/'+ req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.createSession = function(req,res){
    req.flash('success','Login Successfull!');
    return res.redirect('/');
}

module.exports.destroySession= function(req,res){
    req.logout(function(err){
        if(err){
            console.log("Error in Log Out",err);
        }
        req.flash('success','Successfully Logged Out')
        return res.redirect('/')
    });
}