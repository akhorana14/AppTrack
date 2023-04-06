import { Configuration, OpenAIApi } from 'openai'
import { Classification, parseClassification } from '../../models/Classification';

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

export default class OpenAIClient {

    /**
     * Determine (using OpenAI) whether an email is job related or not.
     * 
     * @param messageBody the body of the email to determine if is job related or not
     * @returns true if email is job related; false otherwise
     */
    public static async isJobRelated(messageBody:string):Promise<boolean> {
        const promptBase = "Is the following email related to a job application? (Yes or No):\n";
        let response = await this.sendMessageToGPT(promptBase+"\n"+messageBody);
        if(response.includes("Yes")) {
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
    public static async classifyEmail(messageBody: string): Promise<{ classification: Classification, company: string }> {
        const promptBase = String.raw`Please classify the following email, as one of the following 
            {"Offer", "Application Confirmation", "Interview", "Online Assessment", "Other", or "Rejection"} 
            and categorize the company name (or "Unknown") in a JSON object. 
            For example {"company":"Test", "classification": "Rejection"}:`;    
        let response = JSON.parse(await this.sendMessageToGPT(promptBase+"\n"+messageBody));
        let output = { classification: parseClassification(response.classification), company: response.company }
        return output;
    }

    /**
     * Sends a message to OpenAI GPT (specifically gpt-3.5-turbo) and returns the response.
     * 
     * @param message the message to send
     * @returns GPT response
     */
    private static async sendMessageToGPT(message:string):Promise<string> {
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
                    timeout: 5000
                }
            );
            return completion.data.choices[0].message?.content!;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}
