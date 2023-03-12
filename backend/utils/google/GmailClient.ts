import { google } from "googleapis";
import { gmail_v1 } from "googleapis/build/src/apis/gmail";
import AppTrackUserProfile from "../../models/AppTrackUserProfile";

export default class GmailClient {

    private gmail: gmail_v1.Gmail;
    private user: AppTrackUserProfile;

    /**
     * Construct a new GmailClient for a specific AppTrack user.
     * 
     * @param user An object representing the user's session info, which can be obtained from `req.user` in any Express route.
     */
    constructor(user: AppTrackUserProfile) {
        this.user = user;
        let oauthClient = new google.auth.OAuth2(
            process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_ID!,
            process.env.APPTRACK_GOOGLE_OAUTH_CLIENT_SECRET!,
            process.env.APPTRACK_GOOGLE_OAUTH_REDIRECT!
        );
        oauthClient.setCredentials(this.user.tokens!);
        this.gmail = google.gmail({
            version: 'v1',
            auth: oauthClient
        });
    }

    public async getListOfMessages():Promise<string[]> {
        const { data: { messages } } = await this.gmail.users.messages.list({ userId: this.user.id });
        const messageIds = messages!.map(message => message.id!);
        return messageIds;
    }

    /**
     * Returns a string representing the full contents of an email message (in .eml format)
     *  
     * @param messageId the email message id (or message object from @see getListOfMessages())
     */
    public async getRawMessage(messageId: string): Promise<string> {
        let { data: message } = await this.gmail.users.messages.get({ userId: this.user.id, id: messageId, format: "RAW" });
        let eml = Buffer.from(message.raw!, 'base64').toString("ascii");
        return eml;
    }
}
