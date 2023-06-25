import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Configuration, OpenAIApi } from "openai";
import openAIRoutes from './routes/openai.js'

// CONFIG
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
  // prevents access denial from different servers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
  // get info on API calls
app.use(morgan("common"));
  // ensure data is in JSON format
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// OPEN AI CONFIG
const configuration = new Configuration({
    organization: "org-yqmJkAFryC45q7GGyyXJXKvD",
    apiKey: process.env.OPEN_API_KEY,
});


// will use this data in a sep route file
export const openai = new OpenAIApi(configuration);

// ROUTES
app.use('/openai', openAIRoutes);

// SERVER SETUP
app.listen(process.env.PORT, () => {
    console.log("Listening on PORT", process.env.PORT || 9000);
})
