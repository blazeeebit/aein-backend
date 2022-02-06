const User = require("../modals/user");
const JWT = require('jsonwebtoken');

exports.verfiyToken = async (req,res,next) => {
    const token = req.params.token;
    await JWT.verify(token,process.env.JWT_SECRET, (err, success) => {
        if(err){
            res.send("Invalid Token resend verification link");
        }
        else{
            next();
        }
    });
}

exports.completeRegistration = async (req, res) => {
    const email = req.params.email;
        try {
            await User.findOneAndUpdate({email:email}, {$set:{verified: true}}, {new:true});
            res.send("Email verified");   
         } catch (error) {
             res.send('Verfication Failed try again!');
         }
}