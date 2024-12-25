import { LogEntity, logEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallBack: ErrorCallback
    ) { }

    private callLogs(log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log);
        })
    }

    
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req) {
                throw new Error(`Error fetching data from ${url}`);
            }

            const logEntity = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service'
            });

            this.callLogs(logEntity)
            this.successCallBack();

            return true
        } catch (error) {

            const errorMessage = `${error}`

            const logErrorEntity = new LogEntity({
                message: ` Error: ${error}`,
                level: LogSeverityLevel.high,
                origin: 'çheck-service'
            });

            this.callLogs(logErrorEntity);


            this.errorCallBack(`${error}`);
            return false;
        }
    }
}