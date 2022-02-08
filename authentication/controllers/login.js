const User = require('../modals/user');
const JWT = require('jsonwebtoken');

const Login = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        let user = await User.findOne({email}).exec();

        if(!user){
            res.send("User Not Found");
        }else{
            user.comparePassword(password, (err, match) => {
                if(!match || err){
                    return res.status(400).send("Wrong Password");
                }else{
                    let token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    });
                    res.header('auth-token', token).json({
                        token,
                        user: {
                            _id: user._id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            username: user.username,
                            usertype: user.usertype,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                            paymentMethods: user.paymentMethods,
                            verified: user.verified
                        }
                    })
                }
            })
        }

    }catch(error){
        res.status(400).send('SignIn failed. Please try again');
    }
}

module.exports = Login;