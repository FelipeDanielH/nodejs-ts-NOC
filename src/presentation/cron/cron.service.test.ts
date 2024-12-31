import { CronService } from "./cron-service";

describe('cron-service', () => {

    const cronTime: string = '* * * * * *';

    const mockOnTick = jest.fn();

    test('should create a job', (done) => {
        

        const cron = CronService.createJob(cronTime, mockOnTick)


        setTimeout(() => {
            expect(mockOnTick).toHaveBeenCalledTimes(3);
            cron.stop()
            done()
        }, 3000)


    })
})