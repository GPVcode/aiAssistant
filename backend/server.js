import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config()



app.listen(process.env.PORT, () => {
    console.log("listening on PORT", process.env.PORT || 9000);
})
