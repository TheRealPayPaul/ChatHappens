import { server } from './server';

const port = 3000;

server.listen(port, () => {
    console.log(`Chat Happens listening on port ${port}`);
});
