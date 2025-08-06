interface BaseAiInterface {
      create: (msg: string, callback: (response: any) => void) => Promise<void>;
    connect:() => void
    addSettings: (data:Record<string,any>) => void
}

export class BaseAI implements BaseAiInterface{
    
    public async create(msg: string, callback: (response: any) => void): Promise<void> {
    // Default implementation or throw an error to enforce override
    throw new Error("Method not implemented.");
  }
    public connect(){}
    public addSettings(){}


}