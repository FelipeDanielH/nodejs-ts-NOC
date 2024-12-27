import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe( ' log.datasource', () => {

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: "test message",
        origin: "test message"
    })


    class MockLogDatasource implements LogDatasource{
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }
    }


    test( 'should test the abstract class', () => {
        const mockLogDatasource  = new MockLogDatasource();

        expect( mockLogDatasource ).toBeInstanceOf(MockLogDatasource);
    })

    test('should save log', async ()=>{
        const mockLogDatasource = new MockLogDatasource();

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toEqual(newLog);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    })



} )