import express from 'express'
import { errorHandler } from './src/middlewares/error-middleware'
import Router from "./src/routes/index-route"
import dotenv from 'dotenv';
import cors from 'cors';


const app = express()
const PORT = 5000

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
  }),
);

app.use(express.json())
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.use(Router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
