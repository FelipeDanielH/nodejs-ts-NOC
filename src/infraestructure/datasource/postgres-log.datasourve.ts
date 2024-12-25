import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prisma = new PrismaClient()

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresDataSource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];


        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level
            }
        })
    }


    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severitylevel]

        const dbLogs = await prisma.logModel.findMany({
            where: {level}
        })
        
        return dbLogs.map( LogEntity.fromObject )
        // return dbLogs.map(LogEntity.fromObject)
    }




}