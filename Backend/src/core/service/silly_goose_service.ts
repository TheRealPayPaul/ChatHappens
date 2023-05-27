import { connect, disconnect } from 'mongoose';

export class SillyGooseService {
    static async connect(): Promise<void> {
        console.info('Connect to MongoDB');
        await connect('mongodb://127.0.0.1:27017/chat-happens');
        console.info('Connected to MongoDB');
    }

    static async disconnect(): Promise<void> {
        console.info('Disconnect from MongoDB');
        await disconnect();
        console.info('Disconnected from MongoDB');
    }
}
