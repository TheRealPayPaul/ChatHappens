import { server } from './server';
import dotenv from 'dotenv';

// Imports .env
dotenv.config();

server.listen(process.env.WEBSERVER_PORT, () => {
    console.log(`Chat Happens listening on port ${process.env.WEBSERVER_PORT}`);
});
