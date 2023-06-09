import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import authorization_router from './authorization/router';
import app_router from './app/router';
import { loggedIn } from './core/guard/auth_guard';
import { SocketHandler } from './core/socket.io/socket_handler';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

SocketHandler.getInstance(io);

app.use(cookieParser());
app.use(express.json());

app.use('/api/authorization', authorization_router);
app.use('/api/app', loggedIn, app_router);

app.get('*.*', express.static(__dirname + '/public'));
app.use('*', express.static(__dirname + '/public'));

export { server };
