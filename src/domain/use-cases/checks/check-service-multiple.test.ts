import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('chieck-service-multiple', ()=> {

    // mock de log repository
    const mockLogRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const mockLogRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockLogRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const arrayLogRepositories = [
        mockLogRepository1,
        mockLogRepository2,
        mockLogRepository3
    ]

    // mock de success callback
    const mockSuccessCallback = jest.fn();

    // mock de error callback 
    const mockErrorCallback = jest.fn();

    // mock del checkserviceMultiple
    const mockCheckServiceMultiple = new CheckServiceMultiple(
        arrayLogRepositories,
        mockSuccessCallback,
        mockErrorCallback
    )

    beforeAll(()=>{
        jest.clearAllMocks();
    });

    test('should call successCalback when fetch return true',async () => {
        
        const url = 'https://google.com';
        
        const returnedValue = await mockCheckServiceMultiple.execute(url);

        expect(returnedValue).toBe(true);

        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();

        expect( mockLogRepository1.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockLogRepository2.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )
        expect( mockLogRepository3.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) )

        
        
        
    })
})