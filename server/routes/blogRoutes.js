import express from 'express';
const route = express.Router();
import {allBlogsRoutes, addBlogRoutes, updateBlogRoutes, 
    deleteBlogRoutes, homeRoutes} from '../services/render';

import {create, find, findOne, update, delet} from '../controller/blogController';
import requireAuth from '../middleware/authMiddleware';

route.get('/',homeRoutes);
route.get('/all-blog',requireAuth,allBlogsRoutes);
route.get('/add-blog',requireAuth,addBlogRoutes);
route.get('/update-blog',requireAuth,updateBlogRoutes);
route.get('/delete-blog',requireAuth,deleteBlogRoutes);


// API then 
if (process.env.NODE_ENV == "production"){
route.post('/api/blogs',requireAuth, create);
route.get('/api/blogs', find);
route.get('/api/blogs/:id', find);
route.put('/api/blogs/:id',requireAuth, update);
route.delete('/api/blogs/:id',requireAuth, delet);
}

else {
    route.post('/api/blogs', create);
    route.get('/api/blogs', find);
    route.get('/api/blogs/:id', find);
    route.put('/api/blogs/:id', update);
    route.delete('/api/blogs/:id', delet);
    }
module.exports = route;