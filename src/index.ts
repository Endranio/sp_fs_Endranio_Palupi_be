import express from 'express'

const app = express()
const PORT = 3005

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
