import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server {
    public static start() {
        console.log('Server started');

        const url = 'https://google.com';

        //* MANDAR EMAIL
        const emailService = new EmailService(fileSystemLogRepository);

        //* Con attachments
        emailService.sendEmailWithFileSystemLogs('felipe.daniel.henriquez@gmail.com');

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

        /* CronService.createJob( 
            '* * * * * *', // Every minute
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