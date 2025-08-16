import { BaseAI } from "@ai/BaseAI.js";
export declare class OpenAI extends BaseAI {
    private ai;
    private settings;
    connect(): void;
    create(msg: string, callback: (data: string) => void): Promise<void>;
    addSettings(data?: {}): void;
}
//# sourceMappingURL=OpenAI.d.ts.map