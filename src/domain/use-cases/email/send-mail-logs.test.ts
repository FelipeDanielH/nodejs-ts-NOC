import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs"

describe('send-email-logs', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
        transporter: {}
    } as unknown as EmailService; //se transforma en unknown porque transporter es privado 

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const mockSendEmailLogs = new SendEmailLogs(
        mockEmailService,
        mockLogRepository
    );

    const destinatary = 'felipe.daniel.test@gmail.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async () => {
        const returnedValue = await mockSendEmailLogs.execute(destinatary);

        expect(returnedValue).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "email enviado",
            origin: "email-send-logs",
        });
    });

    test('should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs = jest.fn().mockReturnValue(false);

        const returnedValue = await mockSendEmailLogs.execute(destinatary);

        expect(returnedValue).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(destinatary);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            "createdAt": expect.any(Date),
            "level": LogSeverityLevel.high,
            "message": "no se pudo enviar el mensaje",
            "origin": "email-send-logs"
        }));
    })


})