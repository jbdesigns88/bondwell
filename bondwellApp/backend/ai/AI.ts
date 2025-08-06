import {OpenAI} from './OpenAI'
import { BaseAI } from "./BaseAI";
const Providers = {
    'openai' :new OpenAI() 
}

export class AI extends BaseAI {
    constructor(provider_type = 'openai'){
        super()
        if(! (provider_type in Providers)){
            throw new Error("the provider_type is not valid")
        }
        return Providers[provider_type] 
        
    }
}