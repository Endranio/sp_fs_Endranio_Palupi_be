import express from 'express'
import { errorHandler } from './middlewares/error-middleware'
import Router from "./routes/index-route"
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
// const PORT = 5000


app.use(
  cors({
    origin: ['https://sp-fs-endranio-palupi.vercel.app'],
  }),
);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.use(Router)
app.use(errorHandler)


export default app