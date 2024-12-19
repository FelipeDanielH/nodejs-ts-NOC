import fs, { mkdirSync } from "fs";
import { LogDatasource } from "../../datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";


export class FileSystemDataSource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor() {
        this.createLogFiles();
    }

    private createLogFiles = () => {

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');

        })


    }


    async saveLog( newLog: LogEntity): Promise<void> {
        fs.appendFileSync( this.allLogsPath, `${JSON.stringify(newLog)}\n`);

        if (newLog.level === LogSeverityLevel.low) return;
        
        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, `${JSON.stringify(newLog)}\n`);
        }else{
            fs.appendFileSync(this.highLogsPath, `${JSON.stringify(newLog)}\n`);
        }
    }




    

    getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severitylevel) {
            case LogSeverityLevel.low:
                
                break;
        
            default:
                break;
        }
        
        throw new Error("Method not implemented.");
    }
}