import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
    execute: (to:string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}



    async execute(to: string | string[]){

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if( !sent ){
                throw new Error('Email log was not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email enviado',
                origin: 'email-send-logs'
            })

            this.logRepository.saveLog(log);

        } catch (error) {
            console.log(`${error}`);

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'no se pudo enviar el mensaje',
                origin: 'email-send-logs'
            })

            this.logRepository.saveLog(log);

            return false;
        }

        return true;
    }
}