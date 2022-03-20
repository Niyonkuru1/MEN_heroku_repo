import mongoose from 'mongoose';
import  {isEmail} from 'validator';
import bcrypt from "bcrypt";

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate: [isEmail, 'Please enter the valid email']
    },
    password: {
        type: String,
        required:[true,'Please enter a password'],
        minlength:[6,'Minimum length should be 6 characters']
    },
});

//fire a function after adoc has been saved to the database
// userSchema.post('save', function (doc, next){
//     console.log(`new user was created & saved ${doc}`);
//     next();
// })

// fire a function before saving the doc to the db
userSchema.pre('save', async function ( next){
    // console.log(`new useer about to be created and saved ${this}`); 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// adding static method to the user 
userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email:email});
    if (user){
        // auth will hold truthy or falsy
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user
        } throw Error("Incorrect password");
    }
    throw Error ("Incorrect Email");
}
const Userdb = mongoose.model("user", userSchema);

module.exports = Userdb;