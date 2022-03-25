const jwt = require('jsonwebtoken');
import dotenv from "dotenv";
import  path  from "path";

dotenv.config({path: path.resolve('./config.env')});

const requireAuth = (req, res, next)=>{

    //grabbing token from the cookies section of the each and every request made
    // const cookieToken = req.cookies.jwt;

    //Grab the token from the header parts of the postman
    // console.log(process.env.SECRET_KEY_DB);

    // FORMAT of them coming back => Authorization: Bearer <access_token>
    var bearerHeader;
if (process.env.NODE_ENV == "production"){
    bearerHeader = req.headers['authorization'];
}
else if (process.env.NODE_ENV == "test"){
    bearerHeader = req.body.token;
} 
else {
    bearerHeader = req.headers['authorization'];
}  
console.log(bearerHeader);
    if (typeof (bearerHeader) !== 'undefined' && typeof (bearerHeader) !== 'null'){
         //split the bearer from string to the array
        let bearerArr = bearerHeader.split(" ");
        const bearerToken = bearerArr[1];
        
    //get the token from the array
        if(bearerToken){
            jwt.verify(bearerToken,process.env.SECRET_KEY_DB, (err, decodedToken) =>{
                if(err){
            // res.redirect('/login');
            res.status(401).send({Error_message:'The action require to login'});
                }
                else {
                    next();
                }
            })
        }
        else {
            res.status(401).send({Error_message:'The action require to login'});
        }
    }
    else{
        res.status(401).send({Error_message:'The action require to login'})
    }

}

export default requireAuth;


