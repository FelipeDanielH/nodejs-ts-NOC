import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo log created', (newLog.id));
    }

    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severitylevel
        })

        return logs.map(LogEntity.fromObject)
    }

}