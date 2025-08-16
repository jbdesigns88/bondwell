import { PrismaClient } from "@prisma/client";
let prisma = null;
try {
    prisma = new PrismaClient();
    if (!prisma) {
        throw new Error("Could not connect ot database");
    }
}
catch (err) {
    console.log("could not connect to databse ", err);
}
export default prisma;
//# sourceMappingURL=index.js.map