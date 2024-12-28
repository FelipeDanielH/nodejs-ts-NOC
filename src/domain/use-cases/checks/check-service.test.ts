import { LogRepository } from "../../repositories/log.repository"
import { CheckService } from "./check-service";

describe('check-service', () => {

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();

    const errorCallback = jest.fn();

    const url = `https://google.com`

    const checkService = new CheckService(
        mockLogRepository,
        successCallback,
        errorCallback
    )

    beforeEach( ()=> {
        jest.clearAllMocks()
    })


    test('should call successCallback when fetch returns true', async () => {

        const returnValue = await checkService.execute(url);

        expect(returnValue).toBe(true);

        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Service https://google.com working",
            origin: "check-service",
        })
    })

    test('should call errorCallback when fetch return false', async () => {

        const badUrl = 'jkasdkjsadfjlk';

        const returnErrorValue = await checkService.execute(badUrl);

        expect(returnErrorValue).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();

        expect(mockLogRepository.saveLog).toHaveBeenCalledWith( {
            "createdAt": expect.any(Date), 
            "level": "high", 
            "message": expect.stringContaining(badUrl),
            "origin": "check-service"
        });
    })
})