import { BaseAI } from "@ai/BaseAI.js";
import { OpenAI as OfficialOpenAI } from "openai";
export class OpenAI extends BaseAI {
    ai;
    settings = {
        model: "gpt-4",
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        messages: []
    };
    connect() {
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
        if (!OPENAI_API_KEY || OPENAI_API_KEY.length === 0) {
            throw new Error("Must provide a valid API Key");
        }
        const openai = new OfficialOpenAI({
            apiKey: OPENAI_API_KEY,
        });
        this.ai = openai;
    }
    async create(msg, callback) {
        try {
            if (!this.ai)
                throw new Error("OpenAI client not connected.");
            this.addSettings({ messages: msg });
            const response = await this.ai.chat.completions.create(this.settings);
            const conversation = [];
            if (typeof response[Symbol.asyncIterator] === "function") {
                for await (const chunk of response) {
                    const partialContent = chunk.choices[0].delta?.content || "";
                    if (partialContent) {
                        callback(partialContent);
                        conversation.push(partialContent);
                    }
                }
            }
            else {
                // Handle non-stream response
                const choices = response.choices || [];
                for (const choice of choices) {
                    const content = choice.message?.content || "";
                    if (content) {
                        callback(content);
                        conversation.push(content);
                    }
                }
            }
            // save conversation
        }
        catch (err) { }
    }
    addSettings(data = {}) {
        this.settings = { ...this.settings, ...data };
    }
}
//# sourceMappingURL=OpenAI.js.map