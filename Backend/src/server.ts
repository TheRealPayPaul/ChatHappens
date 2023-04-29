import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
// import { Server } from 'socket.io';

import authorization_router from './authorization/router';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

app.use(cookieParser());
app.use(express.json());

// TODO Serve angular app
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
});

app.use('/api/authorization', authorization_router);

export { server };