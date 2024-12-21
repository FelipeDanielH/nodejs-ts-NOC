import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
        private readonly logRepository: LogRepository
    ){}


    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            })

            console.log('desde sendEmail: ',sentInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email enviado',
                origin: 'email.service'
            })

            this.logRepository.saveLog(log)

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `email no envidado. error: ${error}`,
                origin: 'email.service'
            })

            this.logRepository.saveLog(log)

            console.log(`${error}`)
            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<void> {

        const subject = 'Logs del servidor'
        const htmlBody = `<h1> LOGS </h1>
            <h2> Sistema NOC </h2>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. In earum eius explicabo dolores vitae, dignissimos iure illum, accusamus dolorum at rerum cum magni adipisci. Numquam eligendi consequatur pariatur ratione voluptatem.  </p>
            <p>ver los logs adjuntos</p>
            <hr>`


        const attachments: Attachement[] = [
            {
                filename: 'logs-low.log',
                path: 'logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: 'logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: 'logs/logs-high.log'
            }
        ]

        const sentInformation = await this.transporter.sendMail({
            to, subject, attachments, html: htmlBody
        })

        console.log('desde sendEmailWithFileSystemLogs: ',sentInformation);
    }

}

