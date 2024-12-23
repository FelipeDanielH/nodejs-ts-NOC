import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string
}

export class MongoDatabase {

    public static async connect( options: ConnectionOptions ): Promise<void> {

        const {mongoUrl, dbName} = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            })

        } catch (error) {
            console.log('error conectandose a la base de datos');
            throw error;
        }

        
    }


}