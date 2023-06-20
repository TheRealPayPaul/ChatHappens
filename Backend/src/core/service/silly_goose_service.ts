import { connect, disconnect } from 'mongoose';

export class SillyGooseService {
    static async connect(): Promise<void> {
        const connectUrl = process.env.MONGODB_DATABASE_URL;
        if (!connectUrl) {
            throw new Error('Connection URL to MongoDB is not set');
        }

        console.info('Connect to MongoDB');
        await connect(connectUrl, {
            auth: {
                username: process.env.MONGODB_DATABASE_USERNAME,
                password: process.env.MONGODB_DATABASE_PASSWORD,
            },
        });
        console.info('Connected to MongoDB');
    }

    static async disconnect(): Promise<void> {
        console.info('Disconnect from MongoDB');
        await disconnect();
        console.info('Disconnected from MongoDB');
    }
}
