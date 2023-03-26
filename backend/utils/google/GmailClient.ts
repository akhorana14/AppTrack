import { google } from "googleapis";
import { gmail_v1 } from "googleapis/build/src/apis/gmail";
import User from "../../models/User";

export default class GmailClient {

    private gmail: gmail_v1.Gmail;
    private user: User;

    /**
     * Construct a new GmailClient for a specific AppTrack user.
     * 
     * @param user An object representing the user's session info, which can be obtained from `req.user` in any Express route.
     */
    constructor(user: User) {
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

    /**
     * Get a list of message ids with an optional query (normal Gmail search queries). 
     * 
     * @param query See here https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list for query parameters.
     * @returns a list of message ids
     */
    public async getListOfMessageIds(query?:string):Promise<string[]> {
        const { data: { messages } } = await this.gmail.users.messages.list({ userId: 'me', q: query});
        const messageIds = messages!.map(message => message.id!);
        return messageIds;
    }

    public async getEmailsContainingKeyword(keyword: string) {
        const messageIds = await this.getListOfMessageIds(keyword);
        let messages:{date:string, from:string, subject:string, body:string }[] = [];
        for(var messageId of messageIds) {
            let { data: { payload: message } } = await this.gmail.users.messages.get({ userId: 'me', id: messageId, format: "full" });
            let sender = message!.headers!.find(header => {return header.name == "From"})?.value!;
            let subject = message!.headers!.find(header => {return header.name == "Subject"})?.value!;
            let date = message!.headers!.find(header => {return header.name == "Date"})?.value!;
            let body = Buffer.from(message!.parts![0].body!.data! ??= "" , 'base64').toString("ascii");
            messages.push({date: date, from: sender, subject: subject, body: body});
        }
        return messages;
    }

    /**
     * Returns a string representing the full contents of an email message (in .eml format)
     *  
     * @param messageId the email message id (or message object from @see getListOfMessages())
     */
    public async getRawMessage(messageId: string): Promise<string> {
        let { data: message } = await this.gmail.users.messages.get({ userId: 'me', id: messageId, format: "RAW" });
        let eml = Buffer.from(message.raw!, 'base64').toString("ascii");
        return eml;
    }
}
