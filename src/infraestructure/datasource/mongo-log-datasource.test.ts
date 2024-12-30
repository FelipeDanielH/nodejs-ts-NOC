import mongoose from "mongoose";
import { MongoDatabase } from "../../data/mongo/init"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDataSource } from "./mongo-log.datasource"
import { LogModel } from "../../data/mongo/models/log.model";
import { envs } from "../../config/plugins/envs.plugin";

describe('mongo-log-datasource', ()=>{

    const mockMongoLogDataSource = new MongoLogDataSource();

    const logEntity = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test message now 1',
        origin: 'mongo-log-datasource.test'
    })


    beforeAll( async ()=> {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    afterAll( ()=> {
        mongoose.connection.close();
    })

    afterEach( async () => {
        await LogModel.deleteMany();
    })

    test('should create a log', async ()=> {

        const consoleSpy = jest.spyOn(console,'log');

        await mockMongoLogDataSource.saveLog(logEntity);

        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Mongo log created", expect.any(String));
    })

    test('should get logs', async  () => {

        await mockMongoLogDataSource.saveLog(logEntity);

        const logs = await mockMongoLogDataSource.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
    })
})