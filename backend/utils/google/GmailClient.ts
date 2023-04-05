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
     * Get a list of message ids with an optional query (normal Gmail search queries like "from: test@example.com"). 
     * 
     * @param query See here https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list for query parameters.
     * @returns a list of message ids
     */
    public async getListOfMessageIds(query?: string): Promise<string[]> {
        const { data: { messages, nextPageToken } } = await this.gmail.users.messages.list(
            {
                userId: 'me',
                q: query,
                maxResults: 500
            }
        );
        const messageIds: string[] = messages === undefined ? [] : messages!.map(message => message.id!);
        let pageToken = nextPageToken;
        while (pageToken != undefined) {
            const { data: { messages, nextPageToken } } = await this.gmail.users.messages.list(
                {
                    pageToken: pageToken
                }
            );
            messageIds.push(...messages!.map(message => message.id!));
            pageToken = nextPageToken;
        }
        return messageIds;
    }

    public static getEmailHeader(message: gmail_v1.Schema$MessagePart, headerName: string): string {
        return message!.headers!.find(header => { return header.name == headerName })?.value!;
    }

    public static getEmailBody(message: gmail_v1.Schema$MessagePart): string {
        if (message.mimeType?.startsWith('multipart')) {
            let fullBody = message.body!.data == undefined ? "" : message.body!.data;
            for (let msgPart of message.parts!) {
                if (msgPart.mimeType?.startsWith("multipart")) {
                    for (let subMsgPart of msgPart.parts!) {
                        if (subMsgPart.mimeType?.startsWith('text/plain')) {
                            fullBody += Buffer.from(subMsgPart.body!.data!, 'base64').toString("ascii");
                        }
                    }
                }
                else if(msgPart.mimeType?.startsWith("text/plain")) {
                    fullBody += msgPart.body!.data == undefined ? "" : Buffer.from(msgPart.body!.data!, 'base64').toString("ascii");
                }
            }
            return fullBody;
        }
        return Buffer.from(message.body!.data! ??= "", 'base64').toString("ascii");
    }

    public async getEmailsFromMessageId(...messageIds: string[]) {
        const messages: gmail_v1.Schema$MessagePart[] = [];
        for (let messageId of messageIds) {
            let { data: { payload: message } } = await this.gmail.users.messages.get({ userId: 'me', id: messageId, format: "full" });
            messages.push(message!);
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
