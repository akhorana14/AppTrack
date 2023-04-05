import { Configuration, OpenAIApi } from 'openai'
import { Classification, parseClassification } from '../../models/Classification';

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

const promptBase = String.raw`Please classify the following email, as one of the following 
{"Offer", "Application Confirmation", "Interview", "Online Assessment", "Other", or "Rejection"} 
and categorize the company name (or "Unknown") in a JSON object. 
For example {"company":"Test", "classification": "Rejection"}:
`;

export default class OpenAIClient {

    /**
     * Classify emails by message body and identifies companies using GPT.
     * 
     * @param messageBody a message body to classify
     * @returns an object containing information about the email
     */
    public static async classifyEmail(messageBody: string): Promise<{ classification: Classification, company: string }> {
        try {
            const completion = await openai.createChatCompletion(
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: promptBase + messageBody
                        }
                    ],
                },
                {
                    timeout: 5000
                }
            );
            //console.dir(completion, {depth:null, 'maxArrayLength': null});
            let output = JSON.parse(completion.data.choices[0].message?.content!);
            let obj = {classification: parseClassification(output.classification), company: output.company}
            return obj;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
