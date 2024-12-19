import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDatasource } from '../../domain/datasource/log.datasource';



export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource,
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog( log );
    }

    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severitylevel);
    }
}
