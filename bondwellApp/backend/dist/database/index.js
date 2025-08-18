"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma = null;
try {
    prisma = new client_1.PrismaClient();
    if (!prisma) {
        throw new Error("Could not connect ot database");
    }
}
catch (err) {
    console.log("could not connect to databse ", err);
}
exports.default = prisma;
