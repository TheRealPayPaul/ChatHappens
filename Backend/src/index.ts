import { server } from './server';
import dotenv from 'dotenv';

// Imports .env
dotenv.config();

start();

async function start(): Promise<void> {
    // await SillyGooseService.connect();

    server.listen(process.env.WEBSERVER_PORT, () => {
        console.log(
            `Chat Happens listening on port ${process.env.WEBSERVER_PORT}`
        );
    });

    // process.on('SIGTERM', () => {
    //     server.close();
    //     SillyGooseService.disconnect();
    //     process.exit(0);
    // });
}
