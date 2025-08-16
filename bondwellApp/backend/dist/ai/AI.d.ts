import { OpenAI } from '@ai/OpenAI.js';
import { BaseAI } from "@ai/BaseAI.js";
declare const Providers: {
    openai: OpenAI;
};
export declare class AI extends BaseAI {
    constructor(provider_type?: keyof typeof Providers);
}
export {};
//# sourceMappingURL=AI.d.ts.map