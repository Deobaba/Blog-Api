const mongoose = require('mongoose');
const {isEmail} = require('validator')
const Blog = require('./blog')
const bcrypt = require('bcrypt')
const ExpressError = require('../src/utils/expressError')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email:{
        type: String,
        unique:true,
        required:[true, "email is required"],
        lowercase: true,
        validate:[isEmail,"enter valid email"]

    },
    password:{
        type: String,
        required: true,
        minlength:[6, "atleast 6 characters"]
    },
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})

// userSchema.pre(
//     'save',
//     async function (next) {
//         const user = this;
//         const hash = await bcrypt.hash(this.password, 10);

//         this.password = hash;
//         next();
//     }
// );

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user
        }
        throw new ExpressError('invalid password', 404)
    }
    throw new ExpressError('invalid email', 404)
}



module.exports = mongoose.model('User', userSchema)