const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{   googleId : {
            type: String,
            trim: true
        },
        facebookId : {
            type: String,
            trim: true
        },
		firstname : {
            type: String,
            trim: true,
            required: 'You must provide a first name'
        },
        lastname : {
            type: String,
            trim: true,
            required: 'You must provide a last name'
        },
        email : {
            type: String,
            trim: true,
            required: 'You must provide a valid email',
            unique: true
        },
        username : {
            type: String,
            trim: true,
            required: 'You must choose a valid username',
            unique: true
        },
        password : {
            type: String,
            trim: true,
            required: 'A password with atleast 8 characters is required',
            min: 8,
            max: 64
        },
        profileImage : {
            type: String,
            trim: true
        },
        usertype : {
            type: String,
            trim: true,
        },
        paymentMethods : [
            {
                paymentMethodtype : {
                    type: String,
                    trim: true
                },
                paymentMethodNumber : {
                    type: String,
                    trim: true
                }
            }
        ],
        verified : {
            type: Boolean,
            default: false
        }


	},
	{ timestamps: true }
);

userSchema.pre('save', function(next) {
	let user = this;

	//hash password only if user is changing password or registering for the first time
	//make sure to use this otherwise each time user.save( is executed, password)
	//will get auto updated and you cant login with orignal password
	if (user.isModified('password')) {
		return bcrypt.hash(user.password, 12, function(err, hash) {
			if (err) {
				console.log('Hashing Error : ', err);
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});
//user regular functions not arrows
userSchema.methods.comparePassword = function(password, next) {
	bcrypt.compare(password, this.password, function(err, match) {
		if (err) {
			return next(err, false);
		} else {
			//if no error we get null
			return next(null, match);
		}
	});
};

module.exports = mongoose.model('User', userSchema);