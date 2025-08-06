import { BaseAI } from "./BaseAI";
import { OpenAI as OfficialOpenAI } from "openai";

export class OpenAI extends BaseAI {
  private ai;
  private settings = {
    model: "gpt-4",
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    messages: [] 
  };

  public connect() {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
    if (!OPENAI_API_KEY || OPENAI_API_KEY.length === 0) {
      throw new Error("Must provide a valid API Key");
    }

    const openai = new OfficialOpenAI({
      apiKey: OPENAI_API_KEY,
    });
    this.ai = openai;
  }

  public async create(msg, callback) {
    
    try {
      if (!this.ai) throw new Error("OpenAI client not connected.");
      this.addSettings( {messages: msg})
      const response = await this.ai.chat.completions.create(this.settings);

      const conversation: string[] = [];
      for await (const chunk of response) {
        const partialContent = chunk.choices[0].delta?.content || "";
        if (partialContent) {
          callback(partialContent);
          conversation.push(partialContent);
        }
      }

      // save conversation
    } catch (err) {}
  }

  public addSettings(data = {}): void {
      this.settings = {...this.settings, ...data}
  }
}
