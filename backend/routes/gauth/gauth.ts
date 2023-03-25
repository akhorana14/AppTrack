import express from 'express';
import googleauth from 'passport-google-oauth';
import passport from 'passport';
import GoogleAuth from '../../utils/google/GoogleAuth';
import GmailClient from '../../utils/google/GmailClient';
import User from '../../models/User';
import { UserController } from '../../controllers/UserController';

const router = express.Router();
export default router;

const GoogleStrategy = googleauth.OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID!,
  clientSecret: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET!,
  callbackURL: process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT!
},
  async function (accessToken: string, refreshToken: string, user: User, done: (arg0: null, arg1: User) => any) {
    let dbUser = await UserController.getById(user.id)
    if (dbUser === null) {
      //Save this user into the database
      UserController.save(user);
    }
    else {
      //Merge attributes from database with local user object
      user = { ...user, ...UserController.getById(user.id) };
    }
    user.tokens = { access_token: accessToken };
    return done(null, user);
  }));

router.get('/', passport.authenticate('google', { scope: process.env.APPTRACK_GOOGLE_OAUTH_SCOPES }));

router.get('/gauthcallback', passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('./gmailtest');
  });

router.get('/gmailtest', GoogleAuth.getAuthMiddleware(), async function (req: any, res, next) {
  let client = new GmailClient(req.user);
  let firstMsgId = (await client.getListOfMessageIds())[0];
  res.send("This is your most recent email:<br><br>" + await client.getRawMessage(firstMsgId));
});
