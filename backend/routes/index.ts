import express from 'express';
import 'dotenv/config';
import gauthRouter from "./gauth/GoogleAuthRouter";

const app = express();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})

app.use('/gauth', gauthRouter);

app.use('/', (req, res) => {
    res.send('Well done!');
})
