import express from 'express';
import { Auth, google, oauth2_v2 } from 'googleapis';
import OAuth2Client = Auth.OAuth2Client;

const router = express.Router();
export default router;

class GoogleAuthRouter {
  static readonly scopes = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/gmail.readonly'
  ];
  private static authUrl: string;

  static {
    let dummyOauth2Client = new OAuth2Client(
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID,
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT
    );
    GoogleAuthRouter.authUrl = dummyOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GoogleAuthRouter.scopes
    });
  }

  static getAuthUrl(): string {
    return GoogleAuthRouter.authUrl;
  }
}

class GoogleUser {
  private oauth2Client: OAuth2Client;
  private userinfo: oauth2_v2.Schema$Userinfo;

  private constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID,
      process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT
    );
  }

  public getId() {
    return this.userinfo.id;
  }

  private async fetchUserinfo() {
    let userClient = google.oauth2({
      auth: this.oauth2Client,
      version: 'v2'
    });
    this.userinfo = (await userClient.userinfo.get()).data;
  }

  static async build(code: string): Promise<GoogleUser> {
    let googleUser = new GoogleUser();
    let { tokens } = await googleUser.oauth2Client.getToken(code);
    googleUser.oauth2Client.setCredentials(tokens);
    await googleUser.fetchUserinfo();
    return googleUser;
  }
}

/* callback with auth code argument */
//See here: https://github.com/googleapis/google-api-nodejs-client#oauth2-client
router.get("/gauthcallback", async function (req, res, next) {
  let code: string = req.query.code! as string;
  let user = await GoogleUser.build(code);
  res.send(user.getId());
});

/* GET google auth url */
router.get("/", function (req, res, next) {
  res.redirect(GoogleAuthRouter.getAuthUrl());
});


