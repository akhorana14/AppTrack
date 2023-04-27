import cors from 'cors';
import express from 'express';
import https from 'node:https';
import fs from "fs";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';

import indexRouter from "./routes/index";
import gauthRouter from "./routes/gauth/gauth";
import companyRouter from "./routes/company/company";
import calendarRouter from "./routes/calendar/calendar"
import createappRouter from "./routes/createapp/createapp";
import userRouter from "./routes/user/user";
import dashboardRouter from "./routes/dashboard/dashboard";

const app = express();
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'SECRET'
}));

app.use(cors({
    origin: `${process.env.APPTRACK_FRONTEND}`,
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT;

https
    .createServer({
        key: fs.readFileSync("cert/privkey.pem"),
        cert: fs.readFileSync("cert/fullchain.pem")
    }, app)
    .listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    })

app.use('/gauth', gauthRouter);

app.use('/company', companyRouter);
app.use('/calendar', calendarRouter);
app.use('/createapp', createappRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.get('/success', (req, res) => res.send("Success"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});

app.use('/', indexRouter);
