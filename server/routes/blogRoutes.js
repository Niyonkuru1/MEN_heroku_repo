import express from 'express';
import { create, find, update, delet, addComment } from '../controller/blogController';
import requireAuth from '../middleware/authMiddleware';
const route = express.Router();

// API then 
if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "production") {
    route.post('/api/blogs', create);
    route.get('/api/blogs', find);
    route.get('/api/blogs/:id', find);
    route.put('/api/blogs/addcom/:id',addComment);
    route.put('/api/blogs/:id', update);
    route.delete('/api/blogs/:id', requireAuth, delet);
}

else {
    route.post('/api/blogs', requireAuth, create);
    route.get('/api/blogs', find);
    route.get('/api/blogs/:id', find);
    route.put('/api/blogs/addcom/:id',addComment);
    route.put('/api/blogs/:id', requireAuth, update);
    route.delete('/api/blogs/:id', requireAuth, delet);
}

module.exports = route;