// Express
import dotenv from 'dotenv'
import express from 'express'
import './config/db.js';



dotenv.config()
const app = express()

const appUrl = process.env.APP_URL
const port = process.env.PORT || 8080

app.use(express.json());

app.get('/', (req, res) => {
  const response = {
    message: 'Hello from the server!!!'
  }
  return res.status(200).json(response)
})


// app.post('/sign-up', (req, res) => {
//   // const { email, password } = req.body;
//   // console.log(password)
//   const response = {
//     message: 'When you think too much you removing whats moving'
//   }
//   return res.status(200).json(response)
// })

app.listen(port, () => {
  console.log(`Server is up on port ${appUrl}:${port}`)
})
