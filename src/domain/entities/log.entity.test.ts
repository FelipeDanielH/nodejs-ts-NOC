import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity', () => {

    


    test('should create a LogEntity Instance', () => {

        const obj = {
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.entity.test'
        }

        const testLogEntity = new LogEntity(obj)

        expect(testLogEntity).toBeInstanceOf(LogEntity);
        expect(testLogEntity.level).toBe(obj.level);
        expect(testLogEntity.message).toBe(obj.message);
        expect(testLogEntity.origin).toBe(obj.origin);

    })

    test('should create a LogEntity instance from JSON', () => {
        const jsonLog = `{"message":"Service https://google.com working","level":"low","origin":"check-service","createdAt":"2024-12-25T14:15:50.078Z"}`

        const logEntity = LogEntity.fromJson(jsonLog);

        expect(logEntity).toBeInstanceOf(LogEntity);

        expect(logEntity.level).toBe("low");
        expect(logEntity.message).toBe("Service https://google.com working");
        expect(logEntity.origin).toBe("check-service");
        expect(logEntity.createdAt).toBeInstanceOf(Date);
    })
})