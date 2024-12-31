import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.impl"

describe('log.repository.impl', () => {

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockLogRepository = new LogRepositoryImpl(mockLogDataSource);

    afterEach( ()=> {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', async () => {

        const log: LogEntity = {
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'log.repository.impl'
        } as LogEntity

        await mockLogRepository.saveLog(log);

        expect(mockLogDataSource.saveLog).toHaveBeenLastCalledWith(log);
    })

    test('getLogs should call the datasource with arguments', async ()=>{

        const log: LogEntity = {
            level: LogSeverityLevel.low,
            message: 'test message',
            origin: 'log.repository.impl'
        } as LogEntity

        await mockLogRepository.saveLog(log);
        
        const logs = await mockLogRepository.getLogs(LogSeverityLevel.low);

        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);

    })

})