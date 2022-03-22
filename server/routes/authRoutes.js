import express from 'express';
const authRoute = express.Router();
import {signup_post_contro,login_post_contro,logout_get_contro, get_all_users} from '../controller/authController';
// import requireAuth from "../middleware/authMiddleware";

// auth API
authRoute.post('/auth/signup',signup_post_contro );
authRoute.post('/auth/login',login_post_contro );
authRoute.put('/auth/logout',logout_get_contro);
authRoute.get('/auth/all-users',get_all_users);

module.exports = authRoute;



