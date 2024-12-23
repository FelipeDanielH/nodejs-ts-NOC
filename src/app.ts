import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";

//Funcion anonima auto-invocada
(
    async () => {
        main();
    }
)()

function main() {

    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // Server.start();
}