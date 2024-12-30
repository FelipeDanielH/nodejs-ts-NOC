import  fs, { mkdirSync }  from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';


describe('file-system.datasource', () => {

    const logsDirectory = path.join(__dirname,'../../../logs');

    const existFile = fs.existsSync(logsDirectory)

    beforeEach(()=> {
        if(existFile){
            fs.rmSync(logsDirectory, { recursive: true })
        }
    })

    test('should create a log file if they do no t exist', () => {

        new FileSystemDataSource

        const path = fs.readdirSync(logsDirectory);

        expect(existFile).toBeTruthy
        expect(path).toEqual([
            'logs-high.log', 
            'logs-low.log', 
            'logs-medium.log' 
        ])
    })

})