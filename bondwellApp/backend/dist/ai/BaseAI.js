"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAI = void 0;
class BaseAI {
    async create(msg, callback) {
        // Default implementation or throw an error to enforce override
        throw new Error("Method not implemented.");
    }
    connect() { }
    addSettings() { }
}
exports.BaseAI = BaseAI;
