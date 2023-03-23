const cors = require("cors");

import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';

import indexRouter from "./routes/index";
import gauthRouter from "./routes/gauth/gauth";
import calendarRouter from "./routes/calendar/calendar";
import createappRouter from "./routes/createapp/createapp";

const app = express();
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'SECRET'
}));

app.use(cors({
    origin: '*'
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})

app.use('/gauth', gauthRouter);
app.use('/calendar', calendarRouter);
app.use('/createapp', createappRouter);

app.get('/success', (req, res) => res.send("Success"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj:any, cb) {
    cb(null, obj);
});

app.use('/', indexRouter);
