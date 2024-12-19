import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start() {
        console.log('Server started');

        const url = 'https://google.com';

        CronService.createJob(
            '* * * * *', // Every minute
            () => {
                new CheckService(
                    () => console.log(`${url} is online`),
                    (error) => console.log(error)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000');
            }
        );
    }
}