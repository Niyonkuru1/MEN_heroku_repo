import express from 'express';
import {postMessage, getMessage, deleteMessage} from '../controller/messageController';
import requireAuth from '../middleware/authMiddleware';
const messageRoute = express.Router();


messageRoute.post('/api/messages', postMessage);
messageRoute.get('/api/messages',getMessage);
messageRoute.delete('/api/messages/:id', requireAuth, deleteMessage);
module.exports = messageRoute;
