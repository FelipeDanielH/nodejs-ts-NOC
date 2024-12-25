import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasource/file-system.datasource";
import { MongoLogDataSource } from "../infraestructure/datasource/mongo-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresDataSource } from "../infraestructure/datasource/postgres-log.datasourve";

const logRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    // new MongoLogDataSource()
    new PostgresDataSource()
)

const emailService = new EmailService();
const emailLogs = new SendEmailLogs(emailService, logRepository);

export class Server {
    public static async start() {
        console.log('Server started');

        const url = 'https://google.com';

        //* MANDAR EMAIL

        //* Con attachments
        // emailLogs.execute(envs.MAILER_DESTINATARY);


        //* Sin attachments
        /* emailService.sendEmail({
            to: 'felipe.daniel.henriquez@gmail.com',
            subject: 'logs de sistema',
            htmlBody: `<h1> LOGS </h1>
            <h2> Sistema NOC </h2>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum eius explicabo dolores vitae, dignissimos iure illum, accusamus dolorum at rerum cum magni adipisci. Numquam eligendi consequatur pariatur ratione voluptatem.  </p>
            <p>ver los logs adjuntos</p>
            <hr>`
        }) */

       /*  const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        console.log(logs); */

        //  quede aqui no se como se manda severity level
        // console.log( await logRepository.getLogs(LogSeverityLevel.low))

        
        // CronService.createJob(
        //     '*/5 * * * * *', // Every minute
        //     () => {
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is online`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );
    }
}