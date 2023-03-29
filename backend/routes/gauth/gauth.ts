import express from 'express';
import googleauth from 'passport-google-oauth';
import passport from 'passport';
import User from '../../models/User';
import UserController from '../../controllers/UserController';

const router = express.Router();
export default router;

const GoogleStrategy = googleauth.OAuth2Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID!,
  clientSecret: process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET!,
  callbackURL: process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT!
},
  async function (accessToken: string, refreshToken: string, user: User, done: (arg0: null, arg1: User) => any) {
    let dbUser = await UserController.getById(user.id);
    if (dbUser === null) {
      //Save this user into the database
      UserController.save(user);
    }
    else {
      //Merge attributes from database with local user object
      //This overwrites any properties from the database with the ones from the local one
      user = {...await UserController.getById(user.id), ...user };
    }
    user.tokens = { access_token: accessToken };
    return done(null, user);
  }));

router.get('/', passport.authenticate('google', { scope: process.env.APPTRACK_GOOGLE_OAUTH_SCOPES }));

router.get('/gauthcallback', passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Redirect to the endpoint that checks the user's inbox for new emails
    res.redirect('/user/refresh');
  });
