import { PrismaClient } from "@prisma/client";
 let prisma;
try{
     prisma  =  new PrismaClient();
    if(!prisma) {
        throw new error("Could not connect ot database")
    }
}
catch(err){
    console.log("could not connect to databse ", err)
}

export default prisma