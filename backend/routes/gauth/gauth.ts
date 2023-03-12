import express from 'express'; 
import googleauth from 'passport-google-oauth';
import passport from 'passport';
import GoogleAuth from '../../utils/google/GoogleAuth';
import GmailClient from '../../utils/google/GmailClient';
import AppTrackUserProfile from '../../models/AppTrackUserProfile';

const router = express.Router();
export default router;

const GoogleStrategy = googleauth.OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID!,
  clientSecret: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET!,
  callbackURL: process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT!
},
  async function (accessToken: string, refreshToken: string, profile: AppTrackUserProfile, done: (arg0: null, arg1: AppTrackUserProfile) => any) {
    profile.tokens = {access_token: accessToken};
    return done(null, profile);
  }));

router.get('/', passport.authenticate('google', { scope: process.env.APPTRACK_GOOGLE_OAUTH_SCOPES }));

router.get('/gauthcallback', passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('./gmailtest');
  });

router.get('/gmailtest', GoogleAuth.getAuthMiddleware(), async function (req:any, res, next) {
  let client = new GmailClient(req.user);
  let firstMsgId = (await client.getListOfMessages())[0];
  res.send("This is your most recent email:<br><br>"+await client.getRawMessage(firstMsgId));
});
