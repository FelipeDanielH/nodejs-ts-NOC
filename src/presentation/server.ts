import { CronService } from "./cron/cron-service";


export class Server {
    public static start() {
        console.log('Server started');

        CronService.createJob(
            '* * * * *', // Every minute
            () => {
                const date = new Date();
                console.log('Every miunte', date)
            }
        );
    }
}