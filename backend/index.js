import express from 'express'
import dotenv from 'dotenv'; 
import { connectDB } from "./Models/db.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './Routes/authRouters.js'
import homeRouter from './Routes/homeRoutes.js'
import morgan from "morgan";


dotenv.config();

const app = express()
const PORT=process.env.PORT || 8080;

app.use(morgan("dev"));

app.get('/ping', (req, res) => {
    res.send("pong...")
});

app.use(bodyParser.json())
app.use(cors())
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
app.use('/auth', authRouter)
app.use('/home', homeRouter)

app.get('/mongo', async (req, res) => {
  await connectDB();
  res.send("MongoDB is connected ✅");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

