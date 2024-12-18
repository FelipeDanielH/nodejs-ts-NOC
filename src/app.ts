import { Server } from "./presentation/server";

//Funcion anonima auto-invocada
(
    async () => {
        main();
    }
)()

function main() {
    Server.start();
}