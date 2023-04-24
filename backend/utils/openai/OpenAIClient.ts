import { Configuration, OpenAIApi } from 'openai';
import { Classification, parseClassification } from '../../models/Classification';

export default class OpenAIClient {

    /**
     * Determine (using OpenAI) whether an email is job related or not.
     * 
     * @param messageBody the body of the email to determine if is job related or not
     * @returns true if email is job related; false otherwise
     */
    public static async isJobRelated(messageBody: string): Promise<boolean> {
        const promptBase = "Is the following email related to a job application? (Respond with 'Yes' or 'No'):\n";
        let response = await this.sendMessageToGPT(promptBase + "\n" + messageBody);
        if (response.includes("Yes")) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Classify emails by message body and identifies companies using GPT.
     * 
     * @param messageBody a message body to classify
     * @returns an object containing information about the email
     */
    public static async classifyEmail(messageBody: string): Promise<{ classification: Classification, company: string, date?: Date }> {
        const promptBase = String.raw`Please classify the following email as one of the following {'Offer', 'Application Confirmation', 
        'Interview', 'Online Assessment', 'Other', or 'Rejection'}, categorize the company name (or 'Unknown'), 
        and the deadline date (or 'Unknown') in a JSON object.  
        For example {"company":"Test", "classification": "Rejection", "date": "September 9, 2021"}:`;
        let response = JSON.parse(await this.sendMessageToGPT(promptBase + "\n" + messageBody));
        let output: { classification: Classification, company: string, date?: Date } = { classification: parseClassification(response.classification), company: response.company }
        if (response.date != undefined && response.date != null) {
            let d = new Date(response.date);
            //Add year check to prevent any invalid dates with the year 1969 (epoch doesn't begin until 1970, so 1969 is the placeholder for invalid dates)
            if (d.toString() != "Invalid Date" && d.getFullYear() > 2000) {
                output.date = d;
            }
        }
        return output;
    }

    /**
     * Get position title from email message body using GPT.
     * 
     * @param messageBody a message body to classify
     * @returns a string with the position title or null if no position title was found in the email
     */
    public static async getPositionTitle(messageBody: string): Promise<string | null> {
        const promptBase = String.raw`Please respond with only the position title from the following email or with 'Unknown':`;
        let response = await this.sendMessageToGPT(promptBase + "\n" + messageBody);
        if (response.includes("Unknown")) {
            return null;
        }
        else {
            return response;
        }

    }

    /**
     * Sends a message to OpenAI GPT (specifically gpt-3.5-turbo) and returns the response.
     * 
     * @param message the message to send
     * @returns GPT response
     */
    private static async sendMessageToGPT(message: string): Promise<string> {
        return this.useOfficialGPTAPI(message);
    }

    /**
     * Uses the official OpenAI GPT API (specifically gpt-3.5-turbo) and returns the response.
     * Requires .env to contain OPENAI_API_KEY
     * 
     * @param message the message to send
     * @returns GPT response
     */
    private static async useOfficialGPTAPI(message: string): Promise<string> {
        const openai = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        }));
        try {
            const completion = await openai.createChatCompletion(
                {
                    model: "gpt-3.5-turbo",
                    //Only want to generate one response
                    n: 1,
                    messages: [
                        {
                            role: "user",
                            content: message,
                        }
                    ],
                },
                {
                    timeout: 30000
                }
            );
            return completion.data.choices[0].message?.content!;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Uses the unoffical ChatGPT API with reverse proxy and returns the response.
     * Requires .env to contain OPENAI_API_UNOFFICIAL_KEY 
     * 
     * @param message the message to send
     * @returns GPT response
     */
    private static async useUnofficialGPTAPI(message: string): Promise<string> {
        const importDynamic = new Function('modulePath', 'return import(modulePath)')
        const { ChatGPTUnofficialProxyAPI } = await importDynamic('chatgpt')
        const openai = new ChatGPTUnofficialProxyAPI({
            accessToken: process.env.OPENAI_API_UNOFFICIAL_KEY!,
            apiReverseProxyUrl: "https://api.pawan.krd/backend-api/conversation",
        })
        try {
            console.log("Sending request...");
            const res = await openai.sendMessage(message, {
                timeoutMs: 30000
            });
            console.log(res);
            return res.text;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}
