import express from 'express';
import {Auth} from 'googleapis';
import OAuth2Client = Auth.OAuth2Client;

const router = express.Router();
export default router;

class GoogleAuthRouter {
  private static oauth2Client: OAuth2Client;
  static readonly scopes = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/gmail.readonly'
  ];

  static {
    GoogleAuthRouter.oauth2Client = new OAuth2Client(
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID,
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT
    );
  }

  static getAuthUrl(): string {
    return GoogleAuthRouter.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GoogleAuthRouter.scopes
    });
  }
}

/* GET google auth url */
router.get("/", function (req, res, next) {
  res.redirect(GoogleAuthRouter.getAuthUrl());
});

/* callback with authCode argument */
//See here: https://github.com/googleapis/google-api-nodejs-client#oauth2-client
router.get("/gauthcallback", function (req, res, next) {
  res.send("LOL");
});
