import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { MongoDatabase } from "./init"

describe('init.ts', () => {

    afterEach(() => {
        mongoose.connection.close();
    });

    test('should connect to mongoDb', async () => {

        const connected = await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });

        expect(connected).toBeTruthy;
    })

    test('should throw an error', async () => {

        const rejectValue = 'conexion fallida';

        const mongoUrl = 'fakeUrl';
        const dbName = 'fakeDbName'

        const connectSpy = jest.spyOn(mongoose,'connect').mockRejectedValue(new Error(rejectValue));

        await expect(
            MongoDatabase.connect({mongoUrl,dbName})
        ).rejects.toThrow(rejectValue)

        connectSpy.mockRestore();
    })
})