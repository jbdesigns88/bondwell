import { BaseAI } from "./BaseAI";
import { OpenAI as OfficialOpenAI } from "openai";


export class OpenAI extends BaseAI {
  private ai!: OfficialOpenAI;
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

  private async handleStreamResponse(response: AsyncIterable<any>, callback: (data: string) => void) {
    console.log("Handling stream response from  own function OpenAI.");
    const conversation: string[] = [];
      for await (const chunk of response as AsyncIterable<any>) {
          const partialContent: string = chunk.choices[0].delta?.content || "";
          if (partialContent) {
            callback(partialContent);
            conversation.push(partialContent);
          }
        }

      return conversation;
  }

  private handleNonStreamResponse(response:any,callback: (data: string) => void ) {
    const conversation: string[] = [];
     const choices = (response as any).choices || [];
        for (const choice of choices) {
          const content: string = choice.message?.content || "";
          if (content) {
            callback(content);
            conversation.push(content);
          }
        }

        return conversation;
  }

  public async create(msg:string, callback:(data:string)=>void,completed:()=>void) {
    console.log(" got the messagge ", msg);

    try {
      if (!this.ai) throw new Error("OpenAI client not connected.");
      console.log("OpenAI client connected.");
   
      console.log("Settings for OpenAI:", this.settings);
      const response = await this.ai.chat.completions.create(this.settings);
      console.log("Received response from OpenAI.");
   
      const conversation: string[] = [];
      if (typeof (response as any)[Symbol.asyncIterator] === "function") {
 
          const response_conversation = await this.handleStreamResponse(response as AsyncIterable<any>, callback);
           conversation.push(...response_conversation || ""); 
      } else {
 
        const response_conversation = this.handleNonStreamResponse(response, callback);
        conversation.push(...response_conversation);
      }
      completed();

      // save conversation
    } catch (err) {
      console.error("Error in OpenAI create method:", err);
      callback("Error: Unable to process the request at this time.");
    }
  }

  public addSettings(data = {}): void {
      this.settings = {...this.settings, ...data}
  }
}
