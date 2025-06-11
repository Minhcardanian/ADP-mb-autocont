import express from 'express';
import dotenv from 'dotenv';
import deployRoute from './routes/deploy.js';
import feeRoute from './routes/fee.js';
import slashRoute from './routes/slash.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.send('ok'));

app.use(deployRoute);
app.use(feeRoute);
app.use(slashRoute);

const port = parseInt(process.env.PORT || '4000', 10);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
