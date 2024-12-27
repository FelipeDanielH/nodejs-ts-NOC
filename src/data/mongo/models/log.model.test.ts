import mongoose from "mongoose"
import { envs } from "../../../config/plugins/envs.plugin"
import { LogSeverityLevel } from "../../../domain/entities/log.entity"
import { MongoDatabase } from "../init"
import { LogModel } from "./log.model"

describe('log.model', () => {

    beforeAll(() => {
        MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    })

    afterAll(() => {
        mongoose.connection.close();
    })


    test('should return LogModel', async () => {
        const options = {
            message: 'test message',
            origin: 'test origin',
            level: 'low'
        }

        const testModel = await LogModel.create(options);

        expect(testModel).toEqual(
            expect.objectContaining(
            {
                ...options,
                createdAt: expect.any(Date),
                id: expect.any(String)
            })  
        )

    })

    test('should return the Schema object', () => {


        const schema = LogModel.schema.obj;

        expect(schema).toEqual({

            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: expect.any(Function),
                enum: ['low', 'medium', 'high'],
                default: 'low'
            },
            createdAt: { type: expect.any(Function), default: expect.any(Date) }

        })

    })
})
