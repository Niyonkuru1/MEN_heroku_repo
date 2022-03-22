import express  from "express";
import  dotenv  from "dotenv";
import  morgan  from "morgan";
import  bodyparser from "body-parser"
import  path  from "path";
import cookieParser from 'cookie-parser';
import cors from "cors";

//swagger deps
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

import  connectDB  from './server/database/connection.js';
// app.use(_path);

const app = express();

// dotenv.config() 
dotenv.config({path: path.resolve('./config.env')});
// console.log(process.env.MONGO_URL);/*  as they were the arguments {path:'config.env'} */
const PORT = process.env.PORT || 8080

// log request. or logging the messages to the node using the morgan just 
//as console did in the browser
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cors());
//connect the database to the app by calling the function defined in the 
// database/connection.js

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));
//this just takes the json type data comes from the submitted form and process it to the regular 
//javascript we can use
app.use(express.json());
app.use(cookieParser());

//swagger setup
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// view engine ( where the parser will get the data from
// in terms of format )
app.set('view engine','ejs')
// app.set('views', path.resolve(__dirname,'views/ejs')) in case your 
// ejs files are inside the ejs folder of the views folder

connectDB();


// load assets. such that if there is a file in the css folder
// you dont need to specify its path exclusively
// just say css/file.css on the rest will be handled by 
//path module
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
// app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
// app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//routes for testing
app.get("/api/welcome", (req,res)=>{
    res.status(302).send({message: "Welcome to the MEN-REST-API"});
});

import route from './server/routes/blogRoutes.js';
import authRoute from './server/routes/authRoutes.js';
//To reference to the routes
app.use('/', route);
app.use('/',authRoute);

module.exports = app;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});
