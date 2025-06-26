import express from 'express'
import { errorHandler } from './src/middlewares/error-middleware'
import Router from "./src/routes/index-route"
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.use(Router)
app.use(errorHandler)

export default app;
