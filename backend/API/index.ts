import express from 'express';
import cors from 'cors';
import studioRouter from '../src/routes/studio.js'; // Path check kar lena

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/studio', studioRouter);

app.get('/', (req, res) => res.send('Race-X Nexus API Live on Vercel'));

export default app;
