import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('file-system.datasource', () => {

    const logsDirectory = path.join(__dirname, '../../../logs');

    const existFile = fs.existsSync(logsDirectory)

    beforeEach(() => {
        if (existFile) {
            fs.rmSync(logsDirectory, { recursive: true })
        }
    })

    test('should create a log file if they do no t exist', () => {

        new FileSystemDataSource()

        const path = fs.readdirSync(logsDirectory);

        expect(existFile).toBeTruthy
        expect(path).toEqual([
            'logs-high.log',
            'logs-low.log',
            'logs-medium.log'
        ])
    })

    test('should save a log in logs-all.log', async () => {

        const fsDataSource = new FileSystemDataSource();

        const log: LogEntity = {
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        await fsDataSource.saveLog(log);

        const logsAllFilePath = path.join(logsDirectory, '/logs-low.log');

        const logsAllFileInformation = JSON.parse(fs.readFileSync(logsAllFilePath, { encoding: 'utf-8' }));

        expect(logsAllFileInformation.level).toEqual(LogSeverityLevel.low);
        expect(logsAllFileInformation.message).toEqual(log.message);
        expect(logsAllFileInformation.origin).toEqual(log.origin);
        expect(new Date(logsAllFileInformation.createdAt)).toEqual(log.createdAt);

    })

    test('should save a log in logs-all.log and logs-high.log', async () => {

        const fsDataSource = new FileSystemDataSource();

        const log: LogEntity = {
            level: LogSeverityLevel.high,
            message: 'test message',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        await fsDataSource.saveLog(log);

        const logsAllFilePath = path.join(logsDirectory, '/logs-low.log');
        const logsHighFilePath = path.join(logsDirectory, '/logs-high.log');

        const logsAllFileInformation = JSON.parse(fs.readFileSync(logsAllFilePath, { encoding: 'utf-8' }));
        const logsHighFileInformation = JSON.parse(fs.readFileSync(logsHighFilePath, { encoding: 'utf-8' }));

        expect(logsAllFileInformation.level).toEqual(LogSeverityLevel.high);

        expect(logsAllFileInformation.message).toEqual(log.message);
        expect(logsAllFileInformation.origin).toEqual(log.origin);
        expect(new Date(logsAllFileInformation.createdAt)).toEqual(log.createdAt);


        expect(logsHighFileInformation.message).toEqual(log.message);
        expect(logsHighFileInformation.origin).toEqual(log.origin);
        expect(new Date(logsHighFileInformation.createdAt)).toEqual(log.createdAt);

    })


    test('should save a log in logs-all.log and logs-medium.log',async  () => {

        const fsDataSource = new FileSystemDataSource();

        const log: LogEntity = {
            level: LogSeverityLevel.medium,
            message: 'test message',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        await fsDataSource.saveLog(log);

        const logsAllFilePath = path.join(logsDirectory, '/logs-low.log');
        const logsMediumFilePath = path.join(logsDirectory, '/logs-medium.log');

        const logsAllFileInformation = JSON.parse(fs.readFileSync(logsAllFilePath, { encoding: 'utf-8' }));
        const logsMediumFileInformation = JSON.parse(fs.readFileSync(logsMediumFilePath, { encoding: 'utf-8' }));

        expect(logsAllFileInformation.level).toEqual(LogSeverityLevel.medium);

        expect(logsAllFileInformation.message).toEqual(log.message);
        expect(logsAllFileInformation.origin).toEqual(log.origin);
        expect(new Date(logsAllFileInformation.createdAt)).toEqual(log.createdAt);


        expect(logsMediumFileInformation.message).toEqual(log.message);
        expect(logsMediumFileInformation.origin).toEqual(log.origin);
        expect(new Date(logsMediumFileInformation.createdAt)).toEqual(log.createdAt);

    })

    test('should return all logs', async () => {

        const fsDataSource = new FileSystemDataSource();

        const lowLog: LogEntity = {
            level: LogSeverityLevel.low,
            message: 'test message low',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        const mediumLog: LogEntity = {
            level: LogSeverityLevel.medium,
            message: 'test message medium',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        const highLog: LogEntity = {
            level: LogSeverityLevel.high,
            message: 'test message high',
            origin: 'file-system.datasource.test.ts',
            createdAt: new Date()
        }

        await fsDataSource.saveLog(lowLog);
        await fsDataSource.saveLog(mediumLog);
        await fsDataSource.saveLog(highLog);

        const allLogs = await fsDataSource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await fsDataSource.getLogs(LogSeverityLevel.medium);
        const highLogs = await fsDataSource.getLogs(LogSeverityLevel.high);

        


    })

})