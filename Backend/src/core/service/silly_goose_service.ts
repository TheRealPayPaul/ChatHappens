import { connect, disconnect } from 'mongoose';

export class SillyGooseService {
    static async connect(): Promise<void> {
        const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_SCHEMA}`;
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        console.info('Connect to MongoDB with', url, 'and credentials', username, password);
        await connect(url, {
            auth: {
                username,
                password,
            },
            authSource: 'admin'
        });
        console.info('Connected to MongoDB');
    }

    static async disconnect(): Promise<void> {
        console.info('Disconnect from MongoDB');
        await disconnect();
        console.info('Disconnected from MongoDB');
    }
}
