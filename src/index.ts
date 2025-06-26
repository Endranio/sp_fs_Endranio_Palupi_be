import express from 'express'
import { errorHandler } from './middlewares/error-middleware'
import Router from "./routes/index-route"
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
const PORT = 5000


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


export default app