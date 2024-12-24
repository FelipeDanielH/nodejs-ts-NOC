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

  /*   const logs = await LogModel.find();
    console.log(logs[2]); */

/*     const newLog = await logModel.create({
        message: 'test message',
        level: 'low',
        origin: 'App.ts'
    }) */

    // console.log(newLog)



    // Server.start();
}