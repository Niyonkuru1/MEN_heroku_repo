import Userdb from '../model/authModel';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('./config.env') });

const handleErrors = (error) => {
    let errors = { message:""};
    //duplicate error checking
    if (error.code == 11000) {
        errors['message'] = "The user already exists";
        return errors;
    }
    //validation errors
    if (error.message.includes('user validation failed')) {
        errors['message'] = "Enter minimum 6 character of password";
        return errors;
        };
    }

//function for CREATING A TOKEN FOR AUTHENTICATION
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY_DB, {
        expiresIn: maxAge
    })
}

export const log =  (req,res)=>{
    res.cookie("ERIKE","RWANDA",{httpOnly:true, maxAge:maxAge});
    res.send({
        message:"welcome WILLIAMS AMARURAWE to the routes COOKIES",
        test:"no it is not you whom i need"
})
}

export const signup_post_contro = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Userdb.create({ email, password });
        const token = createToken(user._id);
           res.cookie('jwt', token, {
               httpOnly:true, maxAge: maxAge * 1000
           })
        res.status(201).json({
            userCred: {
                email: user.email,
            }, token: token 
        })
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ message: error.message });
    }
}

// export const login = (req,res) =>{
//     res.send({message:"hello"})
// }
export const login_post_contro = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    // res.send({message:"hello"})
    try {
        const user = await Userdb.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
        httpOnly:true, maxAge: maxAge * 1000
        })
        // res.status(200).json({user:user._id,token:token})
        res.status(200).send({
            userCred: {
                email: user.email,
                message: "Welcome again, it is pleasure to have you back!"
            },  token: token
        })
    }
    catch (err) {
        res.status(401).send({ response: err.message });
    }

}


export const logout_get_contro = (req, res) => {
    res.cookie('jwt', '', {maxAge:1 });
    const authHeader = req.headers["authorization"];
    res.status(200)
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.status(202).send({ msg: 'You have been Logged Out' });
        }
        else {
            res.status(503).send({ msg: 'Error' });
        }
    }
    );
};


export const get_all_users = (req, res) => {
    Userdb.find()
        .then((users) => {
            res.status(202).send(users);
        })
        .catch((error) => {
            // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
            res.status(500).json({ message: error.message || 'Error Occured while retrieving blog information' })
        })
}



