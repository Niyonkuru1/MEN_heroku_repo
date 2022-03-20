import {mongoose} from "mongoose";
import dotenv from "dotenv";
import  path  from "path";

console.log(process.env.NODE_ENV);

dotenv.config({path: path.resolve('./config.env')});
var DB_URL;
if (process.env.NODE_ENV == "production"){
    DB_URL = process.env.MONGO_URL;
    console.log(DB_URL);
}
else if (process.env.NODE_ENV == "test"){ 
    DB_URL = process.env.MONGO_URL_TEST;
    console.log(DB_URL);
}
else{
    DB_URL = process.env.MONGO_URL_DEFAULT;
    console.log(DB_URL);
}

const connectDB = async () => {
    try{
        //mongodb connection string
        const con = await mongoose.connect(DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useFindAndModify:true,
            // useCreateIndex:true
        })
         if (process.env.NODE_ENV == "production"){
            console.log(`mongoDB connected:${con.connection.host} and is running in
            the ${process.env.NODE_ENV.toLocaleUpperCase()} MODE`);
        }
        else if (process.env.NODE_ENV == "test"){
            console.log(`mongoDB connected:${con.connection.host} and is running in
         the ${process.env.NODE_ENV.toLocaleUpperCase()} MODE`);
        }
        else{
            console.log(`mongoDB connected:${con.connection.host} and is running in
            the DEFAULT MODE`);
        }
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB ;