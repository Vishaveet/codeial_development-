
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
   try {
    let user = await User.findOne({email:req.body.email})
    if(!user || user.password != req.body.password){
        return res.json(422,{
            message:"Invalid Username or Password"
        });
    }
        return res.json(200,{
            message:"Sign in Successfull here is token. Keep! it safe",
            data:{
                token: jwt.sign(user.toJSON(),'Codeial',{expiresIn:'1000000'})
            }
        })

   } catch (error) {
    console.log("error in jwt",error);
    return res.json(500,{
        message:"Internal server Error"
    });
   }
}