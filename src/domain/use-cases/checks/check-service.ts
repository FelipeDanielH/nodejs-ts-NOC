import { LogEntity, logEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallBack: ErrorCallback
    ) { }

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

            this.logRepository.saveLog(logEntity)
            this.successCallBack();

            return true
        } catch (error) {

            const errorMessage = `${error}`

            const logErrorEntity = new LogEntity({
                message: ` Error: ${error}`,
                level: LogSeverityLevel.high,
                origin: 'çheck-service'
            });

            this.logRepository.saveLog(logErrorEntity);


            this.errorCallBack(`${error}`);
            return false;
        }
    }
}