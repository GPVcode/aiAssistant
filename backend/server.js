import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


// CONFIG
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))

app.listen(process.env.PORT, () => {
    console.log("listening on PORT", process.env.PORT || 9000);
})
