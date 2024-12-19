import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server {
    public static start() {
        console.log('Server started');

        const url = 'https://google.com';

        //* MANDAR EMAIL


        /* CronService.createJob(
            '* * * * *', // Every minute
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is online`),
                    (error) => console.log(error)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000');
            }
        ); */
    }
}