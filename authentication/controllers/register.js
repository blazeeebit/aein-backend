const User = require('../modals/user')
const {verifyUser} = require('../sendmail/emailstrings');
const sendMail = require('../sendmail/sendmail')
const JWT = require('jsonwebtoken');

const Register = async (req, res) => {
  const { email } = req.body

  let emailExist = await User.findOne({ email }).exec()

  if (emailExist) {
    return res.send('User already exists with this email')
  } else {
    const user = new User(req.body)

    try {
      await user.save();
      let token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '60s'
    })
      // var verifyuser = verifyUser(email,token);
      // sendMail(email,'verify account',verifyuser);
      return res.send('Registration Successful')
    } catch (error) {
      return res.status(400).send('Registration Failed')
    }
  }
}

module.exports = Register
