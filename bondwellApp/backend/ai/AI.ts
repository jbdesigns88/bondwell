import {OpenAI} from "./OpenAI"
import { BaseAI } from "./BaseAI";
const Providers = {
    'openai' :new OpenAI() 
}

export class AI extends BaseAI {
    constructor(provider_type: keyof typeof Providers = 'openai'){
        super()
        if(!(provider_type in Providers)){
            throw new Error("the provider_type is not valid")
        }
        return Providers[provider_type]
    }
}