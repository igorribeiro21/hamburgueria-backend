import express from 'express';
const app = express();
import cors from 'cors';

import routes from './routes/routes';

import './database'
import 'dotenv/config';

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333,() => {
    console.log("Api rodando...");
})