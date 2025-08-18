"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = void 0;
const OpenAI_1 = require("./OpenAI");
const BaseAI_1 = require("./BaseAI");
const Providers = {
    'openai': new OpenAI_1.OpenAI()
};
class AI extends BaseAI_1.BaseAI {
    constructor(provider_type = 'openai') {
        super();
        if (!(provider_type in Providers)) {
            throw new Error("the provider_type is not valid");
        }
        return Providers[provider_type];
    }
}
exports.AI = AI;
