import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { MongoLogDataSource } from "./infraestructure/datasource/mongo-log.datasource";
import { Server } from "./presentation/server";

//Funcion anonima auto-invocada
(
    async () => {
        main();
    }
)()

async function main() {

    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // const prisma = new PrismaClient();

/*     const newLog = await prisma.logModel.create({
        data: {
            level: 'LOW',
            message: 'test message',
            origin: 'app.ts'
        }
    }) */

    /* const logs = await prisma.logModel.findMany({
        where: {
            level: 'LOW'
        }
    })

    console.log(logs);
 */

    Server.start();
}