// import express and dotenv package installed above
import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import cors from 'cors'

// instantiate our express app
const app = express()

// enable env varibales for .env file
dotenv.config()

//enable cors
app.use(cors())

// enable json and url encoded data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

// run application on Port:: 5000
app.listen(5000, () => {
    console.log(`server running: port:: 5000`)
})